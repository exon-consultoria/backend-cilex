import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Segment from '../infra/typeorm/entities/Segment';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Segment> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no segment with given ID");
    }

    return result;
  }
}
