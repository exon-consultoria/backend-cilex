import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  group_id: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    isAdmin,
    isActive,
    group_id,
  }: IRequestDTO): Promise<User> {
    const entity = await this.usersRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (email !== entity.email) {
      const checkUserExists = await this.usersRepository.findByEmail(email);
      if (checkUserExists) {
        throw new AppError('Email address already used');
      }
    }

    if (name !== entity.name) {
      const checkUserNameExists = await this.usersRepository.findByUsername(
        name,
      );

      if (checkUserNameExists) {
        throw new AppError('Username already used');
      }
    }

    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);
      entity.password = hashedPassword;
    }

    if (isAdmin !== entity.isAdmin) {
      entity.isAdmin = isAdmin;
    }

    if (isActive !== entity.isActive) {
      entity.isActive = isActive;
    }

    entity.name = name || entity.name;
    entity.email = email || entity.email;
    entity.group_id = group_id || entity.group_id;

    return this.usersRepository.save(entity);
  }
}
