import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import deleteFile from 'utils/file';
import Product from '../infra/typeorm/entities/Product';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  application_id: string;
  dimensions_id: string;
  family_id: string;
  group_id: string;
  subfamily_id: string;
  subgroup_id: string;
  picture: string;
  technical_picture: string;
  technical_description: string;
  type_id: string;
  umc_id: string;
  umu_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    description,
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
    if (code) {
      const checkCodeExist = await this.entityRepository.findByCode(code);

      if (checkCodeExist) {
        await deleteFile(`./tmp/products/${picture}`);
        await deleteFile(`./tmp/products/${technical_picture}`);
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    const result = await this.entityRepository.create({
      code,
      description,
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
    });

    return result;
  }
}
