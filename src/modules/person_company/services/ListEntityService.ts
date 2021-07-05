import { inject, injectable } from 'tsyringe';
import PersonCompany from '../infra/typeorm/entities/PersonCompany';

import IPersonCompany from '../repositories/IPersonCompany';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('PersonCompanyRepository')
    private personCompanyRepository: IPersonCompany,
  ) {}

  public async execute(
    company: string,
    person: string,
  ): Promise<PersonCompany[]> {
    let result = await this.personCompanyRepository.findAll();

    if (company) {
      result = await this.personCompanyRepository.findByCompany(company);
    }

    if (person) {
      result = await this.personCompanyRepository.findByPerson(person);
    }

    return result;
  }
}
