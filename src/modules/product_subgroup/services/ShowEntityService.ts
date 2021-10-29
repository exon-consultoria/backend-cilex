import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductSubGroup from '../infra/typeorm/entities/ProductSubGroup';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ProductSubGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<ProductSubGroup> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
