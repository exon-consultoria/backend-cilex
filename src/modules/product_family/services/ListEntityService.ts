import { inject, injectable } from 'tsyringe';
import ProductFamily from '../infra/typeorm/entities/ProductFamily';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductFamily[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
