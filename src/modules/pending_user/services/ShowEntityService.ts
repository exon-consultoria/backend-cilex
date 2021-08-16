import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import PendingUser from '../infra/typeorm/entities/PendingUser';

import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('PendingUserRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<PendingUser> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no role with given ID");
    }

    return result;
  }
}
