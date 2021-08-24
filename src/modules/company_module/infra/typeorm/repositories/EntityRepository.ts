import ICreateEntityDTO from '@modules/company_module/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/company_module/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import CompanyModule from '../entities/CompanyModule';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<CompanyModule>;

  constructor() {
    this.ormRepository = getRepository(CompanyModule);
  }

  public async findAll(): Promise<CompanyModule[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<CompanyModule | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCompany(id: string): Promise<CompanyModule[]> {
    const result = await this.ormRepository.find({ where: { company_id: id } });

    return result;
  }

  public async findByModule(id: string): Promise<CompanyModule[]> {
    const result = await this.ormRepository.find({ where: { module_id: id } });

    return result;
  }

  public async create({
    module_id,
    company_id,
  }: ICreateEntityDTO): Promise<CompanyModule> {
    const result = this.ormRepository.create({
      module_id,
      company_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: CompanyModule): Promise<CompanyModule> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: CompanyModule): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
