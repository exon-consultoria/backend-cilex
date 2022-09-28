import ICreateEntityDTO from '@modules/pet/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/pet/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Pet from '../entities/Pet';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Pet>;

  constructor() {
    this.ormRepository = getRepository(Pet);
  }

  public async findAll(): Promise<Pet[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Pet | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Pet | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    name,
    breed,
    born_at,
    gender,
    sociable,
    castrated,
    items,
    enclosure_id,
    owner_id,
    note,
    dog_size,
  }: ICreateEntityDTO): Promise<Pet> {
    const result = this.ormRepository.create({
      name,
      breed,
      born_at,
      gender,
      enclosure_id,
      items,
      owner_id,
      note,
      sociable,
      castrated,
      dog_size,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Pet): Promise<Pet> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Pet): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
