import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  cod: string;
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
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute({
    cod,
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
  }: IRequestDTO): Promise<Company> {
    const checkCodExist = await this.companyRepository.findByCod(cod);

    if (checkCodExist) {
      throw new AppError(
        "There's already a company registered with the same code",
      );
    }

    const result = await this.companyRepository.create({
      cod,
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
    });

    return result;
  }
}
