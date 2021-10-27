import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductApplication from '../infra/typeorm/entities/ProductApplication';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductApplicationRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductApplication> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
