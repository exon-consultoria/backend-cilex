import ICreatePersonCompanyDTO from '@modules/person_company/dtos/ICreatePersonCompanyDTO';
import PersonCompany from '@modules/person_company/infra/typeorm/entities/PersonCompany';
import { v4 as uuid } from 'uuid';
import IPersonCompany from '../IPersonCompany';

class FakeEntityRepository implements IPersonCompany {
  private items: PersonCompany[] = [];

  public async findAll(): Promise<PersonCompany[]> {
    return this.items;
  }

  public async findById(id: string): Promise<PersonCompany | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByPerson(id: string): Promise<PersonCompany[]> {
    const result = this.items.filter(item => item.person_id === id);

    return result;
  }

  public async findByCompany(id: string): Promise<PersonCompany[]> {
    const result = this.items.filter(item => item.company_id === id);

    return result;
  }

  public async create(
    entityData: ICreatePersonCompanyDTO,
  ): Promise<PersonCompany> {
    const item = new PersonCompany();

    Object.assign(item, { id: uuid() }, entityData);

    this.items.push(item);

    return item;
  }

  public async update(entity: PersonCompany): Promise<PersonCompany> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === entity.id,
    );

    this.items[findIndex] = entity;

    return entity;
  }

  public async delete(entity: PersonCompany): Promise<void> {
    const index = this.items.findIndex(item => item.id === entity.id);

    this.items.splice(index, 1);
  }
}

export default FakeEntityRepository;
