import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductGroup from '../infra/typeorm/entities/ProductGroup';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductGroup> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
