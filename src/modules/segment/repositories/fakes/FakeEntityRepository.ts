import ICreateEntityDTO from '@modules/group/dtos/ICreateEntityDTO';
import Group from '@modules/group/infra/typeorm/entities/Group';
import { v4 as uuid } from 'uuid';
import IEntityRepository from '../IEntityRepository';

class FakeEntityRepository implements IEntityRepository {
  private items: Group[] = [];

  public async findAll(): Promise<Group[]> {
    return this.items;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByCode(code: string): Promise<Group | undefined> {
    const result = this.items.find(item => item.code === code);

    return result;
  }

  public async create(entityData: ICreateEntityDTO): Promise<Group> {
    const item = new Group();

    Object.assign(item, { id: uuid() }, entityData);

    this.items.push(item);

    return item;
  }

  public async update(entity: Group): Promise<Group> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === entity.id,
    );

    this.items[findIndex] = entity;

    return entity;
  }

  public async delete(entity: Group): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id);

    this.items.splice(index, 1);
  }
}

export default FakeEntityRepository;
