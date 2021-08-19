import ICreateUserCompany from '@modules/user_company/dtos/ICreateUserCompany';
import UserCompany from '@modules/user_company/infra/typeorm/entities/UserCompany';
import { v4 as uuid } from 'uuid';
import IUserCompany from '../IUserCompany';

class FakeEntityRepository implements IUserCompany {
  private items: UserCompany[] = [];

  public async findAll(): Promise<UserCompany[]> {
    return this.items;
  }

  public async findById(id: string): Promise<UserCompany | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByUser(id: string): Promise<UserCompany[]> {
    const result = this.items.filter(item => item.user_id === id);

    return result;
  }

  public async findByCompany(id: string): Promise<UserCompany[]> {
    const result = this.items.filter(item => item.company_id === id);

    return result;
  }

  public async create(entityData: ICreateUserCompany): Promise<UserCompany> {
    const item = new UserCompany();

    Object.assign(item, { id: uuid() }, entityData);

    this.items.push(item);

    return item;
  }

  public async update(entity: UserCompany): Promise<UserCompany> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === entity.id,
    );

    this.items[findIndex] = entity;

    return entity;
  }

  public async delete(entity: UserCompany): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id);

    this.items.splice(index, 1);
  }
}

export default FakeEntityRepository;
