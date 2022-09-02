import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IIncomeRepository from '../repositories/IIncomeRepository';

@injectable()
export default class DeleteIncomeService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute(income_id: string): Promise<void> {
    const result = await this.incomeRepository.findById(income_id);

    if (!result) {
      throw new AppError("There's no company with given ID");
    }

    await this.incomeRepository.delete(result);
  }
}
