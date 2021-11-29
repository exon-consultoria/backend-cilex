import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Transaction from '../infra/typeorm/entities/Transaction';

import IEntityRepository from '../repositories/IEntityRepository';

import IProductRepository from '../../product/repositories/IEntityRepository';

import IStorageRepository from '../../storage/repositories/IEntityRepository';

import IUserRepository from '../../user/repositories/IUsersRepository';

interface IRequestDTO {
  product_id: string;
  origin_id?: string;
  destination_id?: string;
  quantity: string;
  type: string;
  user_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('TransactionRepository')
    private entityRepository: IEntityRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StorageRepository')
    private storageRepository: IStorageRepository,

    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    product_id,
    origin_id,
    destination_id,
    quantity,
    type,
    user_id,
  }: IRequestDTO): Promise<Transaction> {
    if (type === 'transfer') {
      if (origin_id === destination_id) {
        throw new AppError('Origin same as destination');
      }
    }

    const checkProductID = await this.productRepository.findById(product_id);

    if (!checkProductID) {
      throw new AppError(`There's no product with given ID${product_id}`);
    }

    if (origin_id) {
      const checkOriginID = await this.storageRepository.findById(origin_id);

      if (!checkOriginID) {
        throw new AppError(`There's no storage with given ID ${origin_id}`);
      }
    } else {
      origin_id = undefined;
    }

    if (destination_id) {
      const checkDestinationID = await this.storageRepository.findById(
        destination_id,
      );

      if (!checkDestinationID) {
        throw new AppError(
          `There's no storage with given ID ${destination_id}`,
        );
      }
    } else {
      destination_id = undefined;
    }

    const result = await this.entityRepository.create({
      product_id,
      origin_id,
      destination_id,
      quantity,
      type,
      user_id,
    });

    return result;
  }
}
