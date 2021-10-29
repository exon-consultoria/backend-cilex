import ICreateEntityDTO from '@modules/product_subfamily/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_subfamily/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductSubFamily from '../entities/ProductSubFamily';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductSubFamily>;

  constructor() {
    this.ormRepository = getRepository(ProductSubFamily);
  }

  public async findAll(): Promise<ProductSubFamily[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductSubFamily | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductSubFamily | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
    product_family_id,
  }: ICreateEntityDTO): Promise<ProductSubFamily> {
    const result = this.ormRepository.create({
      code,
      description,
      product_family_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductSubFamily): Promise<ProductSubFamily> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductSubFamily): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
