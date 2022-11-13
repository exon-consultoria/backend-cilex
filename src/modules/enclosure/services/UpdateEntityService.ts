import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Enclosure from '../infra/typeorm/entities/Enclosure';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
  size?: string;
  enclosure_size_big?: string;
  enclosure_size_medium?: string;
  enclosure_size_small?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('EnclosureRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    description,
    code,
    size,
    enclosure_size_big,
    enclosure_size_big_available,
    enclosure_size_medium,
    enclosure_size_medium_available,
    enclosure_size_small,
    enclosure_size_small_available,
  }: IRequestDTO): Promise<Enclosure> {
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
    entity.size = size || entity.size;

    entity.enclosure_size_big = enclosure_size_big || entity.enclosure_size_big;

    entity.enclosure_size_big_available =
      enclosure_size_big_available || entity.enclosure_size_big_available;

    entity.enclosure_size_medium =
      enclosure_size_medium || entity.enclosure_size_medium;

    entity.enclosure_size_medium_available =
      enclosure_size_medium_available || entity.enclosure_size_medium_available;

    entity.enclosure_size_small =
      enclosure_size_small || entity.enclosure_size_small;

    entity.enclosure_size_small_available =
      enclosure_size_small_available || entity.enclosure_size_small_available;

    return this.entityRepository.update(entity);
  }
}
