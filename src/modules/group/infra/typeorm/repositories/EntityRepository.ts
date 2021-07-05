import ICreateEntityDTO from '@modules/group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Group from '../entities/Group';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async findAll(): Promise<Group[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Group | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({ code, description }: ICreateEntityDTO): Promise<Group> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Group): Promise<Group> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Group): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
