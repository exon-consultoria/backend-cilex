import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductType from '../infra/typeorm/entities/ProductType';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  accept_structure: boolean;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductTypeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    accept_structure,
    description,
  }: IRequestDTO): Promise<ProductType> {
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
      accept_structure,
      description,
    });

    return result;
  }
}
