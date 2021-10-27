import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductDimension from '../entities/ProductDimension';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductDimension>;

  constructor() {
    this.ormRepository = getRepository(ProductDimension);
  }

  public async findAll(): Promise<ProductDimension[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductDimension | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductDimension | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<ProductDimension> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductDimension): Promise<ProductDimension> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductDimension): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
