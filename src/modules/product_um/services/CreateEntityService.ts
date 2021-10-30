import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ProductUM from '../infra/typeorm/entities/ProductUM';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ProductUMRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ code, description }: IRequestDTO): Promise<ProductUM> {
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
