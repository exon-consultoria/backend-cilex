import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductSubFamily from '../infra/typeorm/entities/ProductSubFamily';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  product_family_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductSubFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    description,
    product_family_id,
  }: IRequestDTO): Promise<ProductSubFamily> {
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
      product_family_id,
    });

    return result;
  }
}
