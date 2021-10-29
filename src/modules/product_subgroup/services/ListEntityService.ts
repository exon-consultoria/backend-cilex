import { inject, injectable } from 'tsyringe';
import ProductSubGroup from '../infra/typeorm/entities/ProductSubGroup';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductSubGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductSubGroup[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
