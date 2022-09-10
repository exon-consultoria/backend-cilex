import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IIncomeEntityDTO } from '../dtos/IIncomeEntityDTO';

import IIncomeRepository from '../repositories/IIncomeRepository';
import Income from '../infra/typeorm/entities/Income';

@injectable()
export default class UpdateIncomeService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({
    id,
    account,
    code,
    type,
  }: IIncomeEntityDTO): Promise<Income> {
    const findIncome = await this.incomeRepository.findById(id);

    if (!findIncome) {
      throw new AppError("There's no entity with given ID");
    }

    findIncome.code = code || findIncome.code;
    findIncome.account = account || findIncome.account;
    findIncome.type = type || findIncome.type;

    return this.incomeRepository.update(findIncome);
  }
}
