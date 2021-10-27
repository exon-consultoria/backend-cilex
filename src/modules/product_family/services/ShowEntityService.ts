import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductFamily from '../infra/typeorm/entities/ProductFamily';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductFamily> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
