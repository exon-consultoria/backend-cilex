import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '../repositories/ICompanyRepository';

@injectable()
export default class DeleteCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(company_id: string): Promise<void> {
    const result = await this.companyRepository.findById(company_id);

    if (!result) {
      throw new AppError("There's no company with given ID");
    }

    await this.companyRepository.delete(result);
  }
}
