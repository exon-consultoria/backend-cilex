import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Storage from '../entities/Storage';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Storage>;

  constructor() {
    this.ormRepository = getRepository(Storage);
  }

  public async findAll(): Promise<Storage[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Storage | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Storage | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<Storage> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Storage): Promise<Storage> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Storage): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
