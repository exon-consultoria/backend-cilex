import { ICreateEntryEntityDTO } from '@modules/entry/dtos/IEntryEntityDTO';
import IEntryRepository from '@modules/entry/repositories/IEntryRepository';
import { getRepository, Repository } from 'typeorm';
import Entry from '../entities/Entry';

class IncomeRepository implements IEntryRepository {
  private ormRepository: Repository<Entry>;

  constructor() {
    this.ormRepository = getRepository(Entry);
  }

  public async findAll(): Promise<Entry[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Entry | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({
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
    const result = this.ormRepository.create({
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

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entry: Entry): Promise<Entry> {
    return this.ormRepository.save(entry);
  }

  public async delete(entry: Entry): Promise<void> {
    await this.ormRepository.remove(entry);
  }
}

export default IncomeRepository;
