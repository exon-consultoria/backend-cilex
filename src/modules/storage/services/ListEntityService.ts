import { inject, injectable } from 'tsyringe';
import Storage from '../infra/typeorm/entities/Storage';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('StorageRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Storage[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
