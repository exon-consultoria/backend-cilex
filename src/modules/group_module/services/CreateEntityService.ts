import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IModuleRepository from '@modules/module/repositories/IEntityRepository';
import IGroupRepository from '@modules/group/repositories/IEntityRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import GroupModule from '../infra/typeorm/entities/GroupModule';

interface IRequestDTO {
  module_id: string;
  group_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,

    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

    @inject('GroupRepository')
    private groupRepository: IGroupRepository,
  ) {}

  public async execute({
    group_id,
    module_id,
  }: IRequestDTO): Promise<GroupModule> {
    const checkEntity1 = await this.moduleRepository.findById(module_id);

    if (!checkEntity1) {
      throw new AppError('No module founded');
    }

    const checkEntity2 = await this.groupRepository.findById(group_id);

    if (!checkEntity2) {
      throw new AppError('No company founded');
    }

    const result = await this.groupModuleRepository.create({
      group_id,
      module_id,
    });

    return result;
  }
}
