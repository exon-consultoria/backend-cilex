import { inject, injectable } from 'tsyringe';
import ProductUM from '../infra/typeorm/entities/ProductUM';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductUMRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductUM[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
