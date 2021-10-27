import ICreateEntityDTO from '@modules/role/dtos/ICreateEntityDTO';
import Role from '@modules/role/infra/typeorm/entities/Role';
import { v4 as uuid } from 'uuid';
import IEntityRepository from '../IEntityRepository';

class FakeEntityRepository implements IEntityRepository {
  private items: Role[] = [];

  public async findAll(): Promise<Role[]> {
    return this.items;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByCode(code: string): Promise<Role | undefined> {
    const result = this.items.find(item => item.code === code);

    return result;
  }

  public async create(entityData: ICreateEntityDTO): Promise<Role> {
    const item = new Role();

    Object.assign(item, { id: uuid() }, entityData);

    this.items.push(item);

    return item;
  }

  public async update(entity: Role): Promise<Role> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === entity.id,
    );

    this.items[findIndex] = entity;

    return entity;
  }

  public async delete(entity: Role): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id);

    this.items.splice(index, 1);
  }
}

export default FakeEntityRepository;
