import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPendingRepository from '@modules/pending_user/repositories/IEntityRepository';
import IPersonRepository from '../repositories/IPersonRepository';
import Person from '../infra/typeorm/entities/Person';

interface IRequestDTO {
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
  isUser: boolean;
  tipo?: string;
  role_id?: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,

    @inject('PendingUserRepository')
    private pendingRepository: IPendingRepository,
  ) {}

  public async execute({
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
    role_id,
  }: IRequestDTO): Promise<Person> {
    const checkCodeExist = await this.personRepository.findByCode(code);

    if (checkCodeExist) {
      throw new AppError(
        "There's already a person registered with the same code",
      );
    }

    // const checkCnpj

    const result = await this.personRepository.create({
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
      role_id,
    });

    if (isUser) {
      await this.pendingRepository.create({ person_id: result.id });
    }

    return result;
  }
}
