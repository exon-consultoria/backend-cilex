import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserCompany from '@modules/user_company/repositories/IUserCompany';
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
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,

    @inject('UserCompanyRepository')
    private userCompanyRepository: IUserCompany,
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
    });

    await this.userCompanyRepository.create({
      company: result.id,
      user,
    });

    return result;
  }
}
