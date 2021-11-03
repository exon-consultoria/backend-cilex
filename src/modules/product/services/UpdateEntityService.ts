import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
  application_id?: string;
  dimensions_id?: string;
  family_id?: string;
  group_id?: string;
  subfamily_id?: string;
  subgroup_id?: string;
  picture?: string;
  technical_picture?: string;
  technical_description?: string;
  type_id?: string;
  umc_id?: string;
  umu_id?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('ProductRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    description,
    code,
    application_id,
    dimensions_id,
    family_id,
    group_id,
    subfamily_id,
    subgroup_id,
    picture,
    technical_picture,
    technical_description,
    type_id,
    umc_id,
    umu_id,
  }: IRequestDTO): Promise<Product> {
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
    entity.application_id = application_id || entity.application_id;
    entity.dimensions_id = dimensions_id || entity.dimensions_id;
    entity.family_id = family_id || entity.family_id;
    entity.group_id = group_id || entity.group_id;
    entity.subfamily_id = subfamily_id || entity.subfamily_id;
    entity.subgroup_id = subgroup_id || entity.subgroup_id;
    entity.picture = picture || entity.picture;
    entity.technical_picture = technical_picture || entity.technical_picture;
    entity.technical_description =
      technical_description || entity.technical_description;
    entity.type_id = type_id || entity.type_id;
    entity.umc_id = umc_id || entity.umc_id;
    entity.umu_id = umu_id || entity.umu_id;

    return this.entityRepository.update(entity);
  }
}
