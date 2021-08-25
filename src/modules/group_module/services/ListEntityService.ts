import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {
  module_id: string | undefined;
  group_id: string | undefined;
}

@injectable()
export default class ListEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,
  ) {}

  public async execute({
    group_id,
    module_id,
  }: IRequest): Promise<GroupModule[]> {
    let result = await this.groupModuleRepository.findAll();

    if (module_id) {
      result = await this.groupModuleRepository.findByModule(module_id);
    }

    if (group_id) {
      result = await this.groupModuleRepository.findByGroup(group_id);
    }

    return result;
  }
}
