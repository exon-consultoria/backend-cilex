import ICreateEntityDTO from '@modules/group_module/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/group_module/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import GroupModule from '../entities/GroupModule';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<GroupModule>;

  constructor() {
    this.ormRepository = getRepository(GroupModule);
  }

  public async findAll(): Promise<GroupModule[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<GroupModule | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({ name }: ICreateEntityDTO): Promise<GroupModule> {
    const result = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: GroupModule): Promise<GroupModule> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: GroupModule): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
