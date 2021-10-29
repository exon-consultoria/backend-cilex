import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import ProductSubFamily from '../infra/typeorm/entities/ProductSubFamily';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
  product_family_id?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('ProductSubFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    description,
    code,
    product_family_id,
  }: IRequestDTO): Promise<ProductSubFamily> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.entityRepository.findByCode(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    entity.code = code || entity.code;
    entity.description = description || entity.description;
    entity.product_family_id = product_family_id || entity.product_family_id;

    return this.entityRepository.update(entity);
  }
}
