import { inject, injectable } from 'tsyringe';
import { ICreateIncomeEntityDTO } from '../dtos/IIncomeEntityDTO';
import Income from '../infra/typeorm/entities/Income';
import IIncomeRepository from '../repositories/IIncomeRepository';

@injectable()
export default class CreateIncomeService {
  constructor(
    @inject('IncomeRepository')
    private incomeRepository: IIncomeRepository,
  ) {}

  public async execute({
    code,
    account,
    type,
  }: ICreateIncomeEntityDTO): Promise<Income> {
    const result = await this.incomeRepository.create({
      code,
      account,
      type,
    });

    return result;
  }
}
