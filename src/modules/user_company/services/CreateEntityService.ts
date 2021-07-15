import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import IUserCompany from '../repositories/IUserCompany';
import UserCompany from '../infra/typeorm/entities/UserCompany';

interface IRequestDTO {
  user: string;
  company: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,

    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({ user, company }: IRequestDTO): Promise<UserCompany> {
    const checkPersonExist = await this.userRepository.findById(user);

    if (!checkPersonExist) {
      throw new AppError('No user founded');
    }

    const checkCompanyExist = await this.companyRepository.findById(company);

    if (!checkCompanyExist) {
      throw new AppError('No  company founded');
    }

    const result = await this.userCompanyRepository.create({
      user,
      company,
    });

    return result;
  }
}
