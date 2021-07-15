import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonRepository from '@modules/person/repositories/IPersonRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IPersonCompany from '../repositories/IPersonCompany';
import PersonCompany from '../infra/typeorm/entities/PersonCompany';

interface IRequestDTO {
  person: string;
  company: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PersonCompanyRepository')
    private personCompanyRepository: IPersonCompany,

    @inject('PersonRepository')
    private personRepository: IPersonRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({
    person,
    company,
  }: IRequestDTO): Promise<PersonCompany> {
    const checkPersonExist = await this.personRepository.findById(person);

    if (!checkPersonExist) {
      throw new AppError('No  person founded');
    }

    const checkCompanyExist = await this.companyRepository.findById(company);

    if (!checkCompanyExist) {
      throw new AppError('No  company founded');
    }

    const result = await this.personCompanyRepository.create({
      person,
      company,
    });

    return result;
  }
}
