import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import ProductFamily from '../infra/typeorm/entities/ProductFamily';

export default interface IEntityRepository {
  findAll(): Promise<ProductFamily[]>;
  findById(id: string): Promise<ProductFamily | undefined>;
  findByCode(code: string): Promise<ProductFamily | undefined>;
  create(data: ICreateEntityDTO): Promise<ProductFamily>;
  update(entity: ProductFamily): Promise<ProductFamily>;
  delete(entity: ProductFamily): Promise<void>;
}
