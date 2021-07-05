import ICreateUserCompany from '@modules/user_company/dtos/ICreateUserCompany';
import IUserCompany from '@modules/user_company/repositories/IUserCompany';
import { getRepository, Repository } from 'typeorm';
import UserCompany from '../entities/UserCompany';

class EntityRepository implements IUserCompany {
  private ormRepository: Repository<UserCompany>;

  constructor() {
    this.ormRepository = getRepository(UserCompany);
  }

  public async findAll(): Promise<UserCompany[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<UserCompany | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByUser(id: string): Promise<UserCompany[]> {
    const result = await this.ormRepository.query(`
    SELECT user_company.id, companies.cod, companies.razao_social, companies.id
    FROM user_company
    INNER JOIN companies on user_company.company_id=companies.id
    WHERE user_company.user_id='${id}'

    `);

    return result;
  }

  public async findByCompany(id: string): Promise<UserCompany[]> {
    const result = await this.ormRepository.find({ where: { company_id: id } });

    return result;
  }

  public async create({
    company,
    user,
  }: ICreateUserCompany): Promise<UserCompany> {
    const result = this.ormRepository.create({
      company_id: company,
      user_id: user,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: UserCompany): Promise<UserCompany> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: UserCompany): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
