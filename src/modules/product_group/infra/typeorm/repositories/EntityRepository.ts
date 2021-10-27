import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductGroup from '../entities/ProductGroup';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductGroup>;

  constructor() {
    this.ormRepository = getRepository(ProductGroup);
  }

  public async findAll(): Promise<ProductGroup[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductGroup | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductGroup | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<ProductGroup> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductGroup): Promise<ProductGroup> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductGroup): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
