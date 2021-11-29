import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Transaction from '../infra/typeorm/entities/Transaction';

interface IRequestDTO {
  id: string;
  product_id?: string;
  origin_id?: string;
  destination_id?: string;
  quantity?: string;
  type?: string;
  user_id?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('TransactRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    product_id,
    origin_id,
    destination_id,
    quantity,
    type,
    user_id,
  }: IRequestDTO): Promise<Transaction> {
    // A transaction can be updated?

    const entity = await this.entityRepository.findById(id);

    if (!entity) {
      throw new AppError(`There's no entity with given ID ${id}`);
    }

    entity.product_id = product_id || entity.product_id;
    entity.origin_id = origin_id || entity.origin_id;
    entity.destination_id = destination_id || entity.destination_id;
    entity.quantity = quantity || entity.quantity;
    entity.type = type || entity.type;
    entity.user_id = user_id || entity.user_id;

    return this.entityRepository.update(entity);
  }
}
