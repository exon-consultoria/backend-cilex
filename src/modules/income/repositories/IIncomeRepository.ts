import ICreateIncomeDTO from '../dtos/ICreateIncomeEntityDTO';
import Income from '../infra/typeorm/entities/Income';

export default interface IIncomeRepository {
  findAll(): Promise<Income[]>;
  findById(id: string): Promise<Income | undefined>;
  create(data: ICreateIncomeDTO): Promise<Income>;
  update(income: Income): Promise<Income>;
  delete(income: Income): Promise<void>;
}
