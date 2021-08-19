import { inject, injectable } from 'tsyringe';
import Segment from '../infra/typeorm/entities/Segment';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Segment[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
