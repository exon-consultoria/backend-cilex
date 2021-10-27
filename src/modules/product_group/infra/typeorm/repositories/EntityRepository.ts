import ICreateEntityDTO from '@modules/product_type/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_type/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductType from '../entities/ProductType';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductType>;

  constructor() {
    this.ormRepository = getRepository(ProductType);
  }

  public async findAll(): Promise<ProductType[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductType | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductType | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    accept_structure,
    description,
  }: ICreateEntityDTO): Promise<ProductType> {
    const result = this.ormRepository.create({
      accept_structure,
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductType): Promise<ProductType> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductType): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
