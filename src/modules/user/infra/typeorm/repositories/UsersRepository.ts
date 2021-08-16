import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByPersonId(person_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { person_id } });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByUsername(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async create({
    name,
    email,
    password,
    isAdmin,
    person_id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      isAdmin,
      person_id,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
