import { inject, injectable } from 'tsyringe';
import ProductApplication from '../infra/typeorm/entities/ProductApplication';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ProductApplicationRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<ProductApplication[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
