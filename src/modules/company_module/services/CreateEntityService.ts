import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IModuleRepository from '@modules/module/repositories/IEntityRepository';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';

interface IRequestDTO {
  module_id: string;
  company_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,

    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({
    company_id,
    module_id,
  }: IRequestDTO): Promise<CompanyModule> {
    const checkEntity1 = await this.moduleRepository.findById(module_id);

    if (!checkEntity1) {
      throw new AppError('No module founded');
    }

    const checkEntity2 = await this.companyRepository.findById(company_id);

    if (!checkEntity2) {
      throw new AppError('No company founded');
    }

    const result = await this.companyModuleRepository.create({
      company_id,
      module_id,
    });

    return result;
  }
}
