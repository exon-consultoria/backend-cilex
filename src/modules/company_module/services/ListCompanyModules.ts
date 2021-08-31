import { inject, injectable } from 'tsyringe';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {
  company: string | undefined;
}

@injectable()
export default class ListCompanyModules {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,
  ) {}

  public async execute({ company }: IRequest): Promise<CompanyModule[]> {
    let result = await this.companyModuleRepository.findAll();

    if (company) {
      result = await this.companyModuleRepository.findByCompanyFormatted(
        company,
      );
    }

    return result;
  }
}
