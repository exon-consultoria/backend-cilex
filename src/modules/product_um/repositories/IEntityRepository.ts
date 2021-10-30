import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductUM from '../infra/typeorm/entities/ProductUM';

export default interface IEntityRepository {
  findAll(): Promise<ProductUM[]>;
  findById(id: string): Promise<ProductUM | undefined>;
  findByCode(code: string): Promise<ProductUM | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductUM>;
  update(entity: ProductUM): Promise<ProductUM>;
  delete(entity: ProductUM): Promise<void>;
}
