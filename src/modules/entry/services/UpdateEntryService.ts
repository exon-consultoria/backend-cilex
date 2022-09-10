import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IEntryEntityDTO } from '../dtos/IEntryEntityDTO';

import IEntryRepository from '../repositories/IEntryRepository';
import Entry from '../infra/typeorm/entities/Entry';

@injectable()
export default class UpdateEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute({
    id,
    cash_flow,
    date_income,
    date_payed,
    date_to_pay,
    description,
    financial_entity,
    payed_status,
    title_status,
    type,
    value,
    value_payed,
    income_id,
  }: IEntryEntityDTO): Promise<Entry> {
    const findEntry = await this.entryRepository.findById(id);

    if (!findEntry) {
      throw new AppError("There's no entity with given ID");
    }

    findEntry.cash_flow = cash_flow || findEntry.cash_flow;
    findEntry.date_income = date_income || findEntry.date_income;
    findEntry.date_payed = date_payed || findEntry.date_payed;
    findEntry.date_to_pay = date_to_pay || findEntry.date_to_pay;
    findEntry.description = description || findEntry.description;
    findEntry.financial_entity = financial_entity || findEntry.financial_entity;
    findEntry.income_id = income_id || findEntry.income_id;
    findEntry.payed_status = payed_status || findEntry.payed_status;
    findEntry.title_status = title_status || findEntry.title_status;
    findEntry.type = type || findEntry.type;
    findEntry.value = value || findEntry.value;
    findEntry.value_payed = value_payed || findEntry.value_payed;

    return this.entryRepository.update(findEntry);
  }
}
