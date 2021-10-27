import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductType from '../infra/typeorm/entities/ProductType';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductTypeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductType> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
