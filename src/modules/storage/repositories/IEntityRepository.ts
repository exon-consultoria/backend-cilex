import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Storage from '../infra/typeorm/entities/Storage';

export default interface IEntityRepository {
  findAll(): Promise<Storage[]>;
  findById(id: string): Promise<Storage | undefined>;
  findByCode(code: string): Promise<Storage | undefined>;
  create(data: ICreateEntityDTO): Promise<Storage>;
  update(entity: Storage): Promise<Storage>;
  delete(entity: Storage): Promise<void>;
}
