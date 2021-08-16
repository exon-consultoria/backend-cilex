import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import PendingUser from '../infra/typeorm/entities/PendingUser';

export default interface IEntityRepository {
  findAll(): Promise<PendingUser[]>;
  findById(id: string): Promise<PendingUser | undefined>;
  findByPersonId(person_id: string): Promise<PendingUser | undefined>;
  create(data: ICreateEntityDTO): Promise<PendingUser>;
  delete(entity: PendingUser): Promise<void>;
}
