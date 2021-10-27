import { inject, injectable } from 'tsyringe';
import ProductType from '../infra/typeorm/entities/ProductType';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductTypeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductType[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
