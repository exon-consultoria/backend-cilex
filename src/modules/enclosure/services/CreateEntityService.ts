import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Enclosure from '../infra/typeorm/entities/Enclosure';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
  size: string;
  enclosure_size: string;
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
    enclosure_size,
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
      enclosure_size,
    });

    return result;
  }
}
