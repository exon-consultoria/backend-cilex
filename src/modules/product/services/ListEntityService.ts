import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
