import { ICreateEntryEntityDTO } from '../dtos/IEntryEntityDTO';
import Entry from '../infra/typeorm/entities/Entry';

export default interface IEntryRepository {
  findAll(): Promise<Entry[]>;
  findById(id: string): Promise<Entry | undefined>;
  create(data: ICreateEntryEntityDTO): Promise<Entry>;
  update(entry: Entry): Promise<Entry>;
  delete(entry: Entry): Promise<void>;
}
