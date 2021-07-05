import { inject, injectable } from 'tsyringe';
import UserCompany from '../infra/typeorm/entities/UserCompany';
import IUserCompany from '../repositories/IUserCompany';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,
  ) {}

  public async execute(company: string, user: string): Promise<UserCompany[]> {
    let result = await this.userCompanyRepository.findAll();

    if (company) {
      result = await this.userCompanyRepository.findByCompany(company);
    }

    if (user) {
      result = await this.userCompanyRepository.findByUser(user);
    }

    return result;
  }
}
