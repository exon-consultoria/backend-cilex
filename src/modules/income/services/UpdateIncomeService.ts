import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateIncomeEntityDTO from '../dtos/IUpdateIncomeEntityDTO';

import IIncomeRepository from '../repositories/IIncomeRepository';
import Income from '../infra/typeorm/entities/Income';

@injectable()
export default class UpdateIncomeService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute(data: IUpdateIncomeEntityDTO): Promise<Income> {
    const { id } = data;
    const findIncome = await this.incomeRepository.findById(id);

    if (!findIncome) {
      throw new AppError("There's no entity with given ID");
    }

    return this.incomeRepository.update(findIncome);
  }
}
