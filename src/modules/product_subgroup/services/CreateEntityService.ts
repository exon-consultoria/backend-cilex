import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductSubGroup from '../infra/typeorm/entities/ProductSubGroup';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  product_group_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductSubGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    description,
    product_group_id,
  }: IRequestDTO): Promise<ProductSubGroup> {
    if (code) {
      const checkCodeExist = await this.entityRepository.findByCode(code);

      if (checkCodeExist) {
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    const result = await this.entityRepository.create({
      code,
      description,
      product_group_id,
    });

    return result;
  }
}
