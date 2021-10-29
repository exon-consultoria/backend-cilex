import { inject, injectable } from 'tsyringe';
import ProductSubFamily from '../infra/typeorm/entities/ProductSubFamily';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductSubFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductSubFamily[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
