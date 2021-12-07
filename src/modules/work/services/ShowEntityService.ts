import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Work from '../infra/typeorm/entities/Work';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('WorkRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Work> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no work with given ID");
    }

    return result;
  }
}
