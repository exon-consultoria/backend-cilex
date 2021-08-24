import { inject, injectable } from 'tsyringe';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,
  ) {}

  public async execute(
    module: string,
    company: string,
  ): Promise<CompanyModule[]> {
    let result = await this.companyModuleRepository.findAll();

    if (module) {
      result = await this.companyModuleRepository.findByModule(module);
    }

    if (company) {
      result = await this.companyModuleRepository.findByCompany(company);
    }

    return result;
  }
}
