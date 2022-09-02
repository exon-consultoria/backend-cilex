import { inject, injectable } from 'tsyringe';
import Entry from '../infra/typeorm/entities/Entry';
import IEntryRepository from '../repositories/IEntryRepository';

@injectable()
export default class ListEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute(): Promise<Entry[]> {
    const result = await this.entryRepository.findAll();

    return result;
  }
}
