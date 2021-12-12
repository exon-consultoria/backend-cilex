import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCompany from '@modules/user_company/repositories/IUserCompany';
import ISegmentRepository from '@modules/segment/repositories/IEntityRepository';
import ISegmentModuleRepository from '@modules/segment_module/repositories/ISegmentModule';
import ICompanyModulesRepository from '@modules/company_module/repositories/IEntityRepository';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  matriz_id?: string;
  user: string;
  segment_id: string;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,

    @inject('SegmentRepository')
    private segmentRepository: ISegmentRepository,

    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModuleRepository,

    @inject('CompanyModuleRepository')
    private companyModuleRepository: ICompanyModulesRepository,
  ) {}

  public async execute({
    code,
    cnpj,
    razao_social,
    nome_fantasia,
    email,
    tel,
    endereco,
    cep,
    uf,
    info,
    matriz_id,
    user,
    segment_id,
  }: IRequestDTO): Promise<Company> {
    const checkCodeExist = await this.companyRepository.findByCode(code);

    if (checkCodeExist) {
      throw new AppError(
        "There's already a company registered with the same code",
      );
    }

    let isMatriz = true;

    if (matriz_id) {
      isMatriz = false;
    }

    const result = await this.companyRepository.create({
      code,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      matriz_id,
      isMatriz,
      segment_id,
    });

    const segmentModules = await this.segmentModuleRepository.findBySegment(
      segment_id,
    );

    segmentModules.forEach(async k => {
      await this.companyModuleRepository.create({
        module_id: k.module_id,
        company_id: result.id,
      });
    });

    await this.userCompanyRepository.create({
      company: result.id,
      user,
    });

    return result;
  }
}
