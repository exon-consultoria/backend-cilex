import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Entry from '../infra/typeorm/entities/Entry';
import IEntryRepository from '../repositories/IEntryRepository';

@injectable()
export default class ShowEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute(entry_id: string): Promise<Entry> {
    const result = await this.entryRepository.findById(entry_id);

    if (!result) {
      throw new AppError("There's no company with given ID");
    }

    return result;
  }
}
