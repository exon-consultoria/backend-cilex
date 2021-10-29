import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import ProductSubGroup from '../infra/typeorm/entities/ProductSubGroup';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
  product_group_id?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('ProductSubGroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    description,
    code,
    product_group_id,
  }: IRequestDTO): Promise<ProductSubGroup> {
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
    entity.product_group_id = product_group_id || entity.product_group_id;

    return this.entityRepository.update(entity);
  }
}
