import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Product> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
