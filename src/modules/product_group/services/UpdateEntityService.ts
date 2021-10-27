import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import ProductType from '../infra/typeorm/entities/ProductType';

interface IRequestDTO {
  id: string;
  code?: string;
  accept_structure?: boolean;
  description?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('ProductTypeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    accept_structure,
    description,
    code,
  }: IRequestDTO): Promise<ProductType> {
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

    if (accept_structure && !entity.accept_structure) {
      entity.accept_structure = true;
    }

    if (!accept_structure && entity.accept_structure) {
      entity.accept_structure = false;
    }

    entity.code = code || entity.code;
    entity.description = description || entity.description;

    return this.entityRepository.update(entity);
  }
}
