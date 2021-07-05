import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Role from '../infra/typeorm/entities/Role';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('RoleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Role> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no role with given ID");
    }

    return result;
  }
}
