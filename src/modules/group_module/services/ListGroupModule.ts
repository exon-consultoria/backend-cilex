import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {
  group_id: string | undefined;
}

@injectable()
export default class ListGroupModule {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,
  ) {}

  public async execute({ group_id }: IRequest): Promise<GroupModule[]> {
    let result = await this.groupModuleRepository.findAll();

    if (group_id) {
      result = await this.groupModuleRepository.findByGroupFormatted(group_id);
    }

    return result;
  }
}
