import ICreateEntityDTO from '@modules/vaccine/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/vaccine/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Vaccine from '../entities/Vaccine';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Vaccine>;

  constructor() {
    this.ormRepository = getRepository(Vaccine);
  }

  public async findAll(): Promise<Vaccine[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Vaccine | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Vaccine | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<Vaccine> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Vaccine): Promise<Vaccine> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Vaccine): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
