import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  company_id: string;
  cod?: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  email?: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  matriz_id?: string;
}

@injectable()
export default class UpdateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({
    company_id,
    cod,
    cnpj,
    nome_fantasia,
    razao_social,
    endereco,
    email,
    tel,
    cep,
    info,
    matriz_id,
    uf,
  }: IRequestDTO): Promise<Company> {
    const company = await this.companyRepository.findById(company_id);
    if (!company) {
      throw new AppError("There's no company with given ID");
    }

    if (cod && cod !== company.cod) {
      const checkCodExist = await this.companyRepository.findByCod(cod);

      if (checkCodExist) {
        throw new AppError(
          "There's already a company registered with the same code",
        );
      }
    }

    if (!company) {
      throw new AppError("There's no company with given ID");
    }

    company.cod = cod || company.cod;
    company.cnpj = cnpj || company.cnpj;
    company.nome_fantasia = nome_fantasia || company.nome_fantasia;
    company.razao_social = razao_social || company.razao_social;
    company.endereco = endereco || company.endereco;
    company.email = email || company.email;
    company.tel = tel || company.tel;
    company.cep = cep || company.cep;
    company.info = info || company.info;
    company.matriz_id = matriz_id || company.matriz_id;
    company.uf = uf || company.uf;

    return this.companyRepository.update(company);
  }
}
