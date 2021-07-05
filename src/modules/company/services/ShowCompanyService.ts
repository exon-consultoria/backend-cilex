import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Company from '../infra/typeorm/entities/Company';
import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class ShowCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(company_id: string): Promise<Company> {
    const result = await this.companyRepository.findById(company_id);

    if (!result) {
      throw new AppError("There's no company with given ID");
    }

    return result;
  }
}
