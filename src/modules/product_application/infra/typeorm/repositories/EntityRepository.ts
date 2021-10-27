import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductApplication from '../entities/ProductApplication';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductApplication>;

  constructor() {
    this.ormRepository = getRepository(ProductApplication);
  }

  public async findAll(): Promise<ProductApplication[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductApplication | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(
    code: string,
  ): Promise<ProductApplication | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<ProductApplication> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductApplication): Promise<ProductApplication> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductApplication): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
