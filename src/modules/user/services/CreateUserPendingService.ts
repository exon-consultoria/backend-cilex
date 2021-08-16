import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '@modules/pending_user/repositories/IEntityRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  pendingUser_id: string;
}

@injectable()
export default class CreateUserPendingService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('PendingUserRepository')
    private pendingUserRepository: IEntityRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    isAdmin,
    pendingUser_id,
  }: IRequestDTO): Promise<User> {
    console.log('rota certa');

    const pendingUser = await this.pendingUserRepository.findById(
      pendingUser_id,
    );

    if (!pendingUser) {
      throw new AppError(`No pending User found with id ${pendingUser_id}`);
    }

    const checkUserPerson = await this.usersRepository.findByPersonId(
      pendingUser.person_id,
    );

    if (checkUserPerson) {
      throw new AppError(
        `There's already an User for this person, ID: ${checkUserPerson.id}`,
      );
    }

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const checkUserNameExists = await this.usersRepository.findByUsername(name);

    if (checkUserNameExists) {
      throw new AppError('Username already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    console.log(pendingUser.person_id);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      person_id: pendingUser.person_id,
    });

    await this.pendingUserRepository.delete(pendingUser);

    return user;
  }
}
