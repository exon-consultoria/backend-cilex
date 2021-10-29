import ICreateEntityDTO from '@modules/product_subgroup/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_subgroup/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductSubGroup from '../entities/ProductSubGroup';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductSubGroup>;

  constructor() {
    this.ormRepository = getRepository(ProductSubGroup);
  }

  public async findAll(): Promise<ProductSubGroup[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductSubGroup | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductSubGroup | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
    product_group_id,
  }: ICreateEntityDTO): Promise<ProductSubGroup> {
    const result = this.ormRepository.create({
      code,
      description,
      product_group_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductSubGroup): Promise<ProductSubGroup> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductSubGroup): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
