import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import EnclosureSize from '../infra/typeorm/entities/EnclosureSize';

interface IRequestDTO {
  id: string;
  size?: string;
  capacity?: number;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('EnclosureSizeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    size,
    capacity,
  }: IRequestDTO): Promise<EnclosureSize> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    entity.size = size || entity.size;
    entity.capacity = capacity || entity.capacity;

    return this.entityRepository.update(entity);
  }
}
