import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPersonCompany from '../repositories/IPersonCompany';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('PersonCompanyRepository')
    private personCompanyRepository: IPersonCompany,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.personCompanyRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Person/Company with given ID");
    }

    await this.personCompanyRepository.delete(result);
  }
}
