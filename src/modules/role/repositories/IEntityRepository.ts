import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Role from '../infra/typeorm/entities/Role';

export default interface IEntityRepository {
  findAll(): Promise<Role[]>;
  findById(id: string): Promise<Role | undefined>;
  findByCode(code: string): Promise<Role | undefined>;
  create(data: ICreateEntityDTO): Promise<Role>;
  update(entity: Role): Promise<Role>;
  delete(entity: Role): Promise<void>;
}
