// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Segment from '../infra/typeorm/entities/Segment';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  name: string;
  classIcon: string;
  description: string;
  isLocked: boolean;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    name,
    classIcon,
    description,
    isLocked,
  }: IRequestDTO): Promise<Segment> {
    const result = await this.entityRepository.create({
      name,
      classIcon,
      description,
      isLocked,
    });

    return result;
  }
}
