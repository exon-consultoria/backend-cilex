import { inject, injectable } from 'tsyringe';
import Income from '../infra/typeorm/entities/Income';
import IIncomeRepository from '../repositories/IIncomeRepository';

@injectable()
export default class ListIncomeService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute(): Promise<Income[]> {
    const allIncomes = await this.incomeRepository.findAll();

    return allIncomes;
  }
}
