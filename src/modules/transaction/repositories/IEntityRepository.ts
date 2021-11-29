import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface IEntityRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | undefined>;
  findByStorage(id: string): Promise<Transaction[]>;
  findByProduct(id: string): Promise<Transaction[]>;
  create(data: ICreateEntityDTO): Promise<Transaction>;
  update(entity: Transaction): Promise<Transaction>;
  delete(entity: Transaction): Promise<void>;
}
