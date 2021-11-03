import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IEntityRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByCode(code: string): Promise<Product | undefined>;
  create(data: ICreateEntityDTO): Promise<Product>;
  update(entity: Product): Promise<Product>;
  delete(entity: Product): Promise<void>;
}
