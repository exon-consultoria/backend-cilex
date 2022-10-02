import { ICreateIncomeEntityDTO } from '@modules/income/dtos/IIncomeEntityDTO';
import IIncomeRepository from '@modules/income/repositories/IIncomeRepository';
import { getRepository, Repository } from 'typeorm';
import Income from '../entities/Income';

class IncomeRepository implements IIncomeRepository {
  private ormRepository: Repository<Income>;

  constructor() {
    this.ormRepository = getRepository(Income);
  }

  public async findAll(): Promise<Income[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Income | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({
    code,
    account,
    type,
  }: ICreateIncomeEntityDTO): Promise<Income> {
    const result = this.ormRepository.create({
      code,
      account,
      type,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(income: Income): Promise<Income> {
    return this.ormRepository.save(income);
  }

  public async delete(income: Income): Promise<void> {
    await this.ormRepository.remove(income);
  }
}

export default IncomeRepository;
