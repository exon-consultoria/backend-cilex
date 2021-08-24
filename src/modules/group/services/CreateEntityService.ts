import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IGroupModuleRepository from '@modules/group_module/repositories/IEntityRepository';
import IModuleRepository from '@modules/module/repositories/IEntityRepository';
import Group from '../infra/typeorm/entities/Group';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  modules: [];
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('GroupRepository')
    private entityRepository: IEntityRepository,

    @inject('GroupModuleRepository')
    private groupModuleRepository: IGroupModuleRepository,

    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,
  ) {}

  public async execute({
    code,
    description,
    modules,
  }: IRequestDTO): Promise<Group> {
    if (code) {
      const checkCodeExist = await this.entityRepository.findByCode(code);

      if (checkCodeExist) {
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    const result = await this.entityRepository.create({
      code,
      description,
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
        result.id,
      );

      if (checkRelation) {
        throw new AppError(
          `There's already a group/module relation with ID: ${checkRelation.id}`,
        );
      }
    });

    return result;
  }
}
