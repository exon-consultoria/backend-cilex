/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import IProductInvetoryDTO from '../dtos/IProductInvetoryDTO';
// import Product from '../infra/typeorm/entities/Product';
import IEntityRepository from '../repositories/IEntityRepository';
import ITransactionRepository from '../../transaction/repositories/IEntityRepository';

@injectable()
export default class CalculateInventoryService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IEntityRepository,

    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  public async execute(
    storage_id: string,
    startDate: Date,
    endDate: Date,
  ): Promise<IProductInvetoryDTO[]> {
    const resume: IProductInvetoryDTO[] = [];
    const products = await this.productRepository.findAll();

    for (const _prod of products) {
      let quantity = 0;
      const itemTransactions = await this.transactionRepository.findByProductInRange(
        {
          storage_id,
          product_id: _prod.id,
          startDate: '2021-11-26 17:48:10.902454', // How receive date on this format and test transfer transaction
          endDate: '2022-02-01 02:20:03.046029',
        },
      );

      itemTransactions.forEach(transaction => {
        // console.log(`produto: ${_prod.description}`);
        // console.log(transaction.product_id);

        if (transaction.type === 'in' && transaction.product_id === _prod.id) {
          quantity += parseInt(transaction.quantity, 10);
        } else if (
          transaction.type === 'out' &&
          transaction.product_id === _prod.id
        ) {
          quantity -= parseInt(transaction.quantity, 10);
        } else if (
          transaction.origin_id === storage_id &&
          transaction.product_id === _prod.id
        ) {
          quantity -= parseInt(transaction.quantity, 10);
        } else if (
          transaction.destination_id === storage_id &&
          transaction.product_id === _prod.id
        ) {
          quantity += parseInt(transaction.quantity, 10);
        }
      });

      resume.push({
        description: _prod.description,
        quantity,
      });
    }

    return resume;
  }
}
