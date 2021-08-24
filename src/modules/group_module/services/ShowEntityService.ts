import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<GroupModule> {
    const result = await this.groupModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no group/module with given ID");
    }

    return result;
  }
}
