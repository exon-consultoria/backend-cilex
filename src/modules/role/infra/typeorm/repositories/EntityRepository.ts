import ICreateEntityDTO from '@modules/role/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/role/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Role from '../entities/Role';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findAll(): Promise<Role[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Role | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    role,
    description,
  }: ICreateEntityDTO): Promise<Role> {
    const result = this.ormRepository.create({
      role,
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Role): Promise<Role> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Role): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
