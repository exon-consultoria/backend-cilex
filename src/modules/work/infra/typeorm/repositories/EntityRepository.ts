import ICreateEntityDTO from '@modules/work/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/work/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Work from '../entities/Work';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Work>;

  constructor() {
    this.ormRepository = getRepository(Work);
  }

  public async findAll(): Promise<Work[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Work | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Work | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    color,
    description,
  }: ICreateEntityDTO): Promise<Work> {
    const result = this.ormRepository.create({
      color,
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Work): Promise<Work> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Work): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
