import ICreateEntityDTO from '@modules/product/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findAll(): Promise<Product[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Product | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
    application_id,
    dimensions_id,
    family_id,
    group_id,
    subfamily_id,
    subgroup_id,
    picture,
    technical_picture,
    technical_description,
    type_id,
    umc_id,
    umu_id,
    standard_storage,
  }: ICreateEntityDTO): Promise<Product> {
    const result = this.ormRepository.create({
      code,
      description,
      application_id,
      dimensions_id,
      family_id,
      group_id,
      subfamily_id,
      subgroup_id,
      picture,
      technical_picture,
      technical_description,
      type_id,
      umc_id,
      umu_id,
      standard_storage,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Product): Promise<Product> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Product): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
