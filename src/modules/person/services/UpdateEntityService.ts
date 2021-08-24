import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IEntityRepository from '@modules/pending_user/repositories/IEntityRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import IRoleRepository from '@modules/role/repositories/IEntityRepository';
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
  role_id?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,

    @inject('PendingUserRepository')
    private pendingUserRepository: IEntityRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
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
    role_id,
  }: IRequestDTO): Promise<Person> {
    const entity = await this.personRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no person with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.personRepository.findByCode(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already a person registered with the same code",
        );
      }
    }

    // Caso atualize para usuario
    if (isUser && !entity.isUser) {
      const checkPending = await this.pendingUserRepository.findByPersonId(id);

      if (checkPending) {
        throw new AppError(
          `There's already an pending user for this person, ID: ${checkPending.id}`,
        );
      }

      const checkUser = await this.usersRepository.findByPersonId(id);
      if (checkUser) {
        throw new AppError(
          `There's already an User for this person, ID: ${checkUser.id}`,
        );
      }

      await this.pendingUserRepository.create({ person_id: id });

      entity.isUser = true;
    }

    // Caso atualize  para não-usuario
    if (!isUser && entity.isUser) {
      const pending_user = await this.pendingUserRepository.findByPersonId(id);
      if (pending_user) {
        await this.pendingUserRepository.delete(pending_user);
      }

      const user = await this.usersRepository.findByPersonId(id);
      if (user) {
        user.isActive = false;
        await this.usersRepository.save(user);
      }

      entity.isUser = false;
    }

    if (role_id) {
      const role = await this.roleRepository.findById(role_id);
      if (!role) {
        throw new AppError('No role_id found with given ID');
      }
      entity.role = role;
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

    entity.uf = uf || entity.uf;

    return this.personRepository.update(entity);
  }
}
