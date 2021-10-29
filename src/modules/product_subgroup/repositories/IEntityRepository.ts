import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductSubGroup from '../infra/typeorm/entities/ProductSubGroup';

export default interface IEntityRepository {
  findAll(): Promise<ProductSubGroup[]>;
  findById(id: string): Promise<ProductSubGroup | undefined>;
  findByCode(code: string): Promise<ProductSubGroup | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductSubGroup>;
  update(entity: ProductSubGroup): Promise<ProductSubGroup>;
  delete(entity: ProductSubGroup): Promise<void>;
}
