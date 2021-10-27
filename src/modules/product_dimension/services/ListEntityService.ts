import { inject, injectable } from 'tsyringe';
import ProductDimension from '../infra/typeorm/entities/ProductDimension';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductDimensionRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductDimension[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
