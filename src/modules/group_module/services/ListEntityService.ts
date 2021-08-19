import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<GroupModule[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
