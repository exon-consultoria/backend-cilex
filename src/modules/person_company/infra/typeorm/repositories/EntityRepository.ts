import ICreatePersonCompanyDTO from '@modules/person_company/dtos/ICreatePersonCompanyDTO';
import IPersonCompany from '@modules/person_company/repositories/IPersonCompany';
import { getRepository, Repository } from 'typeorm';
import PersonCompany from '../entities/PersonCompany';

class EntityRepository implements IPersonCompany {
  private ormRepository: Repository<PersonCompany>;

  constructor() {
    this.ormRepository = getRepository(PersonCompany);
  }

  public async findAll(): Promise<PersonCompany[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<PersonCompany | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByPerson(id: string): Promise<PersonCompany[]> {
    const result = await this.ormRepository.find({ where: { person_id: id } });

    return result;
  }

  public async findByCompany(id: string): Promise<PersonCompany[]> {
    const result = await this.ormRepository.find({ where: { company_id: id } });

    return result;
  }

  public async create({
    company,
    person,
  }: ICreatePersonCompanyDTO): Promise<PersonCompany> {
    const result = this.ormRepository.create({
      company_id: company,
      person_id: person,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: PersonCompany): Promise<PersonCompany> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: PersonCompany): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
