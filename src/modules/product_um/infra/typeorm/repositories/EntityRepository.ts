import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductUM from '../entities/ProductUM';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductUM>;

  constructor() {
    this.ormRepository = getRepository(ProductUM);
  }

  public async findAll(): Promise<ProductUM[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductUM | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductUM | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<ProductUM> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductUM): Promise<ProductUM> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductUM): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
