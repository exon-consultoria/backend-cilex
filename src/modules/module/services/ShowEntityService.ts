import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Module from '../infra/typeorm/entities/Module';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('ModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Module> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no module with given ID");
    }

    return result;
  }
}
