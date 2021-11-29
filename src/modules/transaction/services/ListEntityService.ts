import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('TransactionRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Transaction[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
