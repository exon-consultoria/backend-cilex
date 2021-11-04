import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Storage from '../infra/typeorm/entities/Storage';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('StorageRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Storage> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
