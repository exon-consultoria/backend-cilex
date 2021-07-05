import { inject, injectable } from 'tsyringe';
import Role from '../infra/typeorm/entities/Role';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('RoleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
