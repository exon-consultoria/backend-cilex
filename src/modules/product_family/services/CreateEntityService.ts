import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductFamily from '../infra/typeorm/entities/ProductFamily';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductFamilyRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    description,
  }: IRequestDTO): Promise<ProductFamily> {
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
    });

    return result;
  }
}
