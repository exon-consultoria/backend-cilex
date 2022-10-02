import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Income from '../infra/typeorm/entities/Income';
import IIncomeRepository from '../repositories/IIncomeRepository';

@injectable()
export default class ShowCompanyService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute(income_id: string): Promise<Income> {
    const findIncome = await this.incomeRepository.findById(income_id);

    if (!findIncome) {
      throw new AppError("There's no company with given ID");
    }

    return findIncome;
  }
}
