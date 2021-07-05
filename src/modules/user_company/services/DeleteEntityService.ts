import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserCompany from '../repositories/IUserCompany';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.userCompanyRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Person/Company with given ID");
    }

    await this.userCompanyRepository.delete(result);
  }
}
