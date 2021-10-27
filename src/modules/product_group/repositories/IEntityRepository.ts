import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductGroup from '../infra/typeorm/entities/ProductGroup';

export default interface IEntityRepository {
  findAll(): Promise<ProductGroup[]>;
  findById(id: string): Promise<ProductGroup | undefined>;
  findByCode(code: string): Promise<ProductGroup | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductGroup>;
  update(entity: ProductGroup): Promise<ProductGroup>;
  delete(entity: ProductGroup): Promise<void>;
}
