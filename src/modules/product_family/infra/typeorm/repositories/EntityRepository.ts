import ICreateEntityDTO from '@modules/product_group/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/product_group/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import ProductFamily from '../entities/ProductFamily';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<ProductFamily>;

  constructor() {
    this.ormRepository = getRepository(ProductFamily);
  }

  public async findAll(): Promise<ProductFamily[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<ProductFamily | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<ProductFamily | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    description,
  }: ICreateEntityDTO): Promise<ProductFamily> {
    const result = this.ormRepository.create({
      code,
      description,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: ProductFamily): Promise<ProductFamily> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: ProductFamily): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
