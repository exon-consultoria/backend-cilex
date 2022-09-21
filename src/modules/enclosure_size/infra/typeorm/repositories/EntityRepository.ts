import ICreateEntityDTO from '@modules/enclosure_size/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/enclosure_size/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import EnclosureSize from '../entities/EnclosureSize';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<EnclosureSize>;

  constructor() {
    this.ormRepository = getRepository(EnclosureSize);
  }

  public async findAll(): Promise<EnclosureSize[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<EnclosureSize | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<EnclosureSize | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create(
    enclosureSize: ICreateEntityDTO[],
  ): Promise<EnclosureSize[]> {
    const result = this.ormRepository.create(enclosureSize);

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: EnclosureSize): Promise<EnclosureSize> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: EnclosureSize): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
