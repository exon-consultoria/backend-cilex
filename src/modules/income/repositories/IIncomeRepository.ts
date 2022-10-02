import { ICreateIncomeEntityDTO } from '../dtos/IIncomeEntityDTO';
import Income from '../infra/typeorm/entities/Income';

export default interface IIncomeRepository {
  findAll(): Promise<Income[]>;
  findById(id: string): Promise<Income | undefined>;
  create(data: ICreateIncomeEntityDTO): Promise<Income>;
  update(income: Income): Promise<Income>;
  delete(income: Income): Promise<void>;
}
