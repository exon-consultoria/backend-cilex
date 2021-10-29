import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductSubFamily from '../infra/typeorm/entities/ProductSubFamily';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductSubFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductSubFamily> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
