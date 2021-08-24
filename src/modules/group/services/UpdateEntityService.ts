import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGroupModuleRepository from '@modules/group_module/repositories/IEntityRepository';
import IModuleRepository from '@modules/module/repositories/IEntityRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import Group from '../infra/typeorm/entities/Group';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
  modules?: string[];
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('GroupRepository')
    private entityRepository: IEntityRepository,

    @inject('GroupModuleRepository')
    private groupModuleRepository: IGroupModuleRepository,

    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) {}

  public async execute({
    id,
    description,
    code,
    modules,
  }: IRequestDTO): Promise<Group> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.entityRepository.findByCode(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already a entity registered with the same code",
        );
      }
    }

    if (modules) {
      const groupModules = await this.groupModuleRepository.findByGroup(id);
      groupModules.forEach(async groupModule => {
        await this.groupModuleRepository.delete(groupModule);
      });

      // Create Group Module relation
      modules.forEach(async module => {
        // check if there's an module with given id
        const checkModule = await this.moduleRepository.findById(module);
        if (!checkModule) {
          throw new AppError(`No module with given ID: ${module}`);
        }

        // check if there's already a relation between module and group

        const checkRelation = await this.groupModuleRepository.findRelation(
          module,
          id,
        );

        if (checkRelation) {
          throw new AppError(
            `There's already a group/module relation with ID: ${checkRelation.id}`,
          );
        }

        await this.groupModuleRepository.create({
          group_id: id,
          module_id: module,
        });
      });
    }

    entity.code = code || entity.code;
    entity.description = description || entity.description;

    return this.entityRepository.update(entity);
  }
}
