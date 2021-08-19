import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import GroupModule from '../infra/typeorm/entities/GroupModule';

export default interface IEntityRepository {
  findAll(): Promise<GroupModule[]>;
  findById(id: string): Promise<GroupModule | undefined>;
  create(data: ICreateEntityDTO): Promise<GroupModule>;
  update(entity: GroupModule): Promise<GroupModule>;
  delete(entity: GroupModule): Promise<void>;
}
