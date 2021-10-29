import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductSubFamily from '../infra/typeorm/entities/ProductSubFamily';

export default interface IEntityRepository {
  findAll(): Promise<ProductSubFamily[]>;
  findById(id: string): Promise<ProductSubFamily | undefined>;
  findByCode(code: string): Promise<ProductSubFamily | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductSubFamily>;
  update(entity: ProductSubFamily): Promise<ProductSubFamily>;
  delete(entity: ProductSubFamily): Promise<void>;
}
