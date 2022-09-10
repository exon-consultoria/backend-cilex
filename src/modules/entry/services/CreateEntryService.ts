import { inject, injectable } from 'tsyringe';
import { ICreateEntryEntityDTO } from '../dtos/IEntryEntityDTO';
import Entry from '../infra/typeorm/entities/Entry';
import IEntryRepository from '../repositories/IEntryRepository';

@injectable()
export default class CreateEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute({
    date_income,
    type,
    financial_entity,
    description,
    value,
    date_to_pay,
    value_payed,
    date_payed,
    title_status,
    payed_status,
    cash_flow,
    income_id,
  }: ICreateEntryEntityDTO): Promise<Entry> {
    const result = await this.entryRepository.create({
      date_income,
      type,
      financial_entity,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
      income_id,
    });

    return result;
  }
}
