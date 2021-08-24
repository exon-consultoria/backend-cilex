import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,
  ) {}

  public async execute(module: string, group: string): Promise<GroupModule[]> {
    let result = await this.groupModuleRepository.findAll();

    if (module) {
      result = await this.groupModuleRepository.findByModule(module);
    }

    if (group) {
      result = await this.groupModuleRepository.findByGroup(group);
    }

    return result;
  }
}
