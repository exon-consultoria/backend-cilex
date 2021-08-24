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

  public async findByGroup(id: string): Promise<GroupModule[]> {
    const result = await this.ormRepository.find({ where: { group_id: id } });

    return result;
  }

  public async findByModule(id: string): Promise<GroupModule[]> {
    const result = await this.ormRepository.find({ where: { module_id: id } });

    return result;
  }

  public async create({
    group_id,
    module_id,
  }: ICreateEntityDTO): Promise<GroupModule> {
    const result = this.ormRepository.create({
      module_id,
      group_id,
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
