import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Storage from '../infra/typeorm/entities/Storage';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('StorageRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ code, description }: IRequestDTO): Promise<Storage> {
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
