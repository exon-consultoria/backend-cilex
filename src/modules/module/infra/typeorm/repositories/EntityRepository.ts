import ICreateEntityDTO from '@modules/module/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/module/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Module from '../entities/Module';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Module>;

  constructor() {
    this.ormRepository = getRepository(Module);
  }

  public async findAll(): Promise<Module[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Module | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({
    title,
    description,
    classIcon,
    isActive,
    url,
  }: ICreateEntityDTO): Promise<Module> {
    const result = this.ormRepository.create({
      title,
      description,
      classIcon,
      isActive,
      url,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Module): Promise<Module> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Module): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
