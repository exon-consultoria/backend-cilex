import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Group from '../infra/typeorm/entities/Group';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('GroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Group> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no group with given ID");
    }

    return result;
  }
}
