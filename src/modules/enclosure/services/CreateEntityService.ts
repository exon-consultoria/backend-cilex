import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Enclosure from '../infra/typeorm/entities/Enclosure';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  size: string;
  enclosure_size_big: string;
  enclosure_size_big_available: string;
  enclosure_size_medium: string;
  enclosure_size_medium_available: string;
  enclosure_size_small: string;
  enclosure_size_small_available: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('EnclosureRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    description,
    size,
    enclosure_size_big,
    enclosure_size_big_available,
    enclosure_size_medium,
    enclosure_size_medium_available,
    enclosure_size_small,
    enclosure_size_small_available,
  }: IRequestDTO): Promise<Enclosure> {
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
      size,
      enclosure_size_big,
      enclosure_size_big_available,
      enclosure_size_medium,
      enclosure_size_medium_available,
      enclosure_size_small,
      enclosure_size_small_available,
    });

    return result;
  }
}
