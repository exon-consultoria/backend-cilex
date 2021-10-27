import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductType from '../infra/typeorm/entities/ProductType';

export default interface IEntityRepository {
  findAll(): Promise<ProductType[]>;
  findById(id: string): Promise<ProductType | undefined>;
  findByCode(code: string): Promise<ProductType | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductType>;
  update(entity: ProductType): Promise<ProductType>;
  delete(entity: ProductType): Promise<void>;
}
