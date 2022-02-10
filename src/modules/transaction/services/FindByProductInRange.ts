import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class FindByStorageService {
  constructor(
    @inject('TransactionRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Transaction[]> {
    const result = await this.entityRepository.findByStorage(id);

    if (!result) {
      throw new AppError("There's no entity with given ID");
    }

    return result;
  }
}
