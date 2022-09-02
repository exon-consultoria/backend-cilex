import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateEntryEntityDTO from '../dtos/IUpdateEntryEntityDTO';

import IEntryRepository from '../repositories/IEntryRepository';
import Entry from '../infra/typeorm/entities/Entry';

@injectable()
export default class UpdateEntryService {
  constructor(
    @inject('EntryRepository')
    private entryRepository: IEntryRepository,
  ) {}

  public async execute(data: IUpdateEntryEntityDTO): Promise<Entry> {
    const { id } = data;
    const findEntry = await this.entryRepository.findById(id);

    if (!findEntry) {
      throw new AppError("There's no entity with given ID");
    }

    return this.entryRepository.update(findEntry);
  }
}
