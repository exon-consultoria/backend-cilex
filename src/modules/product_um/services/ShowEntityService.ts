import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductUM from '../infra/typeorm/entities/ProductUM';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductUMRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductUM> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
