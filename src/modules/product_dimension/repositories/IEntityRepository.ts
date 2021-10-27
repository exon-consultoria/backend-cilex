import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductDimension from '../infra/typeorm/entities/ProductDimension';

export default interface IEntityRepository {
  findAll(): Promise<ProductDimension[]>;
  findById(id: string): Promise<ProductDimension | undefined>;
  findByCode(code: string): Promise<ProductDimension | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductDimension>;
  update(entity: ProductDimension): Promise<ProductDimension>;
  delete(entity: ProductDimension): Promise<void>;
}
