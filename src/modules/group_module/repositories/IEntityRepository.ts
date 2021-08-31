import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import GroupModule from '../infra/typeorm/entities/GroupModule';

export default interface IEntityRepository {
  findAll(): Promise<GroupModule[]>;
  findById(id: string): Promise<GroupModule | undefined>;
  findByGroup(id: string): Promise<GroupModule[]>;
  findByGroupFormatted(id: string): Promise<GroupModule[]>;
  findByModule(id: string): Promise<GroupModule[]>;
  findRelation(group: string, module: string): Promise<GroupModule | undefined>;
  create(data: ICreateEntityDTO): Promise<GroupModule>;
  update(entity: GroupModule): Promise<GroupModule>;
  delete(entity: GroupModule): Promise<void>;
}
