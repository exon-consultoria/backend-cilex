import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import UserCompany from '../infra/typeorm/entities/UserCompany';
import IUserCompany from '../repositories/IUserCompany';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,
  ) {}

  public async execute(id: string): Promise<UserCompany> {
    const result = await this.userCompanyRepository.findById(id);

    if (!result) {
      throw new AppError("There's no user/company with given ID");
    }

    return result;
  }
}
