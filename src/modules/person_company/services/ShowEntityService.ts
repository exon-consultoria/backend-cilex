import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import PersonCompany from '../infra/typeorm/entities/PersonCompany';
import IPersonCompany from '../repositories/IPersonCompany';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('PersonCompanyRepository')
    private personCompanyRepository: IPersonCompany,
  ) {}

  public async execute(id: string): Promise<PersonCompany> {
    const result = await this.personCompanyRepository.findById(id);

    if (!result) {
      throw new AppError("There's no person/company with given ID");
    }

    return result;
  }
}
