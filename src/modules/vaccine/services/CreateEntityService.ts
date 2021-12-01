import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vaccine from '../infra/typeorm/entities/Vaccine';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('VaccineRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ code, description }: IRequestDTO): Promise<Vaccine> {
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
