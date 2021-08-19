import ICreateEntityDTO from '@modules/segment/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/segment/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Segment from '../entities/Segment';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Segment>;

  constructor() {
    this.ormRepository = getRepository(Segment);
  }

  public async findAll(): Promise<Segment[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Segment | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({
    name,
    classIcon,
    description,
    isLocked,
  }: ICreateEntityDTO): Promise<Segment> {
    const result = this.ormRepository.create({
      name,
      classIcon,
      description,
      isLocked,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Segment): Promise<Segment> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Segment): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
