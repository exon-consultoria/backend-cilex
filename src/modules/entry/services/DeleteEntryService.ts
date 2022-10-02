import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEntryRepository from '../repositories/IEntryRepository';

@injectable()
export default class DeleteEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute(entry_id: string): Promise<void> {
    const result = await this.entryRepository.findById(entry_id);

    if (!result) {
      throw new AppError("There's no company with given ID");
    }

    await this.entryRepository.delete(result);
  }
}
