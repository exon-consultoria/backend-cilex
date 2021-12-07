import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Work from '../infra/typeorm/entities/Work';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  color: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('WorkRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    color,
    description,
  }: IRequestDTO): Promise<Work> {
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
      color,
      description,
    });

    return result;
  }
}
