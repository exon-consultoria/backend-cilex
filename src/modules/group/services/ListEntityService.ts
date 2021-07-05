import { inject, injectable } from 'tsyringe';
import Group from '../infra/typeorm/entities/Group';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('GroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Group[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
