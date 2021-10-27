import { inject, injectable } from 'tsyringe';
import ProductGroup from '../infra/typeorm/entities/ProductGroup';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductGroup[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
