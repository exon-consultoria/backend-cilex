import ICreatePersonDTO from '@modules/person/dtos/ICreatePersonDTO';
import Person from '@modules/person/infra/typeorm/entities/Person';
import { v4 as uuid } from 'uuid';
import IPersonRepository from '../IPersonRepository';

class FakePersonRepository implements IPersonRepository {
  private items: Person[] = [];

  public async findAll(): Promise<Person[]> {
    return this.items;
  }

  public async findById(id: string): Promise<Person | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByCod(code: string): Promise<Person | undefined> {
    const result = this.items.find(item => item.code === code);

    return result;
  }

  public async create(entityData: ICreatePersonDTO): Promise<Person> {
    const item = new Person();

    Object.assign(item, { id: uuid() }, entityData);

    this.items.push(item);

    return item;
  }

  public async update(entity: Person): Promise<Person> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === entity.id,
    );

    this.items[findIndex] = entity;

    return entity;
  }

  public async delete(entity: Person): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id);

    this.items.splice(index, 1);
  }
}

export default FakePersonRepository;
