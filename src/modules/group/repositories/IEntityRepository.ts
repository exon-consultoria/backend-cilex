import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Group from '../infra/typeorm/entities/Group';

export default interface IEntityRepository {
  findAll(): Promise<Group[]>;
  findById(id: string): Promise<Group | undefined>;
  findByCode(code: string): Promise<Group | undefined>;
  create(data: ICreateEntityDTO): Promise<Group>;
  update(entity: Group): Promise<Group>;
  delete(entity: Group): Promise<void>;
}
