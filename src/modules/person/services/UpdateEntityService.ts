import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPersonRepository from '../repositories/IPersonRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequestDTO {
  id: string;
  code: string;
  cnpj?: string;
  cpf?: string;
  nome?: string;
  razao_social?: string;
  nome_fantasia?: string;
  email?: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  isUser?: boolean;
  tipo?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,
  ) {}

  public async execute({
    id,
    code,
    cpf,
    cnpj,
    nome,
    razao_social,
    nome_fantasia,
    email,
    tel,
    endereco,
    cep,
    uf,
    info,
    isUser,
    tipo,
  }: IRequestDTO): Promise<Person> {
    const entity = await this.personRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no person with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.personRepository.findByCod(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already a person registered with the same code",
        );
      }
    }

    if (!entity) {
      throw new AppError("There's no person with given ID");
    }

    entity.code = code || entity.code;
    entity.cpf = cpf || entity.cpf;
    entity.nome = nome || entity.nome;
    entity.cnpj = cnpj || entity.cnpj;
    entity.nome_fantasia = nome_fantasia || entity.nome_fantasia;
    entity.razao_social = razao_social || entity.razao_social;
    entity.endereco = endereco || entity.endereco;
    entity.email = email || entity.email;
    entity.tel = tel || entity.tel;
    entity.cep = cep || entity.cep;
    entity.info = info || entity.info;
    entity.tipo = tipo || entity.tipo;
    entity.isUser = isUser || entity.isUser;
    entity.uf = uf || entity.uf;

    return this.personRepository.update(entity);
  }
}
