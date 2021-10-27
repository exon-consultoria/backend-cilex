import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductApplication from '../infra/typeorm/entities/ProductApplication';

export default interface IEntityRepository {
  findAll(): Promise<ProductApplication[]>;
  findById(id: string): Promise<ProductApplication | undefined>;
  findByCode(code: string): Promise<ProductApplication | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductApplication>;
  update(entity: ProductApplication): Promise<ProductApplication>;
  delete(entity: ProductApplication): Promise<void>;
}
