import ICreateUserCompany from '../dtos/ICreateUserCompany';
import UserCompany from '../infra/typeorm/entities/UserCompany';

export default interface IUserCompany {
  findAll(): Promise<UserCompany[]>;
  findById(id: string): Promise<UserCompany | undefined>;
  findByUser(id: string): Promise<UserCompany[]>;
  findByCompany(id: string): Promise<UserCompany[]>;
  findRelation(
    company_id: string,
    user_id: string,
  ): Promise<UserCompany | undefined>;
  create(data: ICreateUserCompany): Promise<UserCompany>;
  update(entity: UserCompany): Promise<UserCompany>;
  delete(entity: UserCompany): Promise<void>;
}
