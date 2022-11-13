import ICreateEntityDTO from '@modules/enclosure/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/enclosure/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Enclosure from '../entities/Enclosure';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Enclosure>;

  constructor() {
    this.ormRepository = getRepository(Enclosure);
  }

  public async findAll(): Promise<Enclosure[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Enclosure | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Enclosure | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
    size,
    enclosure_size_big,
    enclosure_size_big_available,
    enclosure_size_medium,
    enclosure_size_medium_available,
    enclosure_size_small,
    enclosure_size_small_available,
  }: ICreateEntityDTO): Promise<Enclosure> {
    const result = this.ormRepository.create({
      code,
      description,
      size,
      enclosure_size_big,
      enclosure_size_big_available,
      enclosure_size_medium,
      enclosure_size_medium_available,
      enclosure_size_small,
      enclosure_size_small_available,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Enclosure): Promise<Enclosure> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Enclosure): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
