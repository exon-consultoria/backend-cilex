import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductDimension from '../infra/typeorm/entities/ProductDimension';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductDimensionRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductDimension> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
