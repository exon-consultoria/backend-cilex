import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Segment from '../infra/typeorm/entities/Segment';

interface IRequestDTO {
  id: string;
  name: string;
  classIcon: string;
  description: string;
  isLocked: boolean;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    name,
    classIcon,
    description,
    isLocked,
  }: IRequestDTO): Promise<Segment> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (isLocked !== entity.isLocked) {
      entity.isLocked = isLocked;
    }

    entity.name = name || entity.name;
    entity.classIcon = classIcon || entity.classIcon;
    entity.description = description || entity.description;

    return this.entityRepository.update(entity);
  }
}
