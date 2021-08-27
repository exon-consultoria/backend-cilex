import { inject, injectable } from 'tsyringe';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {
  module: string | undefined;
  company: string | undefined;
}

@injectable()
export default class ListEntityService {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,
  ) {}

  public async execute({
    module,
    company,
  }: IRequest): Promise<CompanyModule[]> {
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
