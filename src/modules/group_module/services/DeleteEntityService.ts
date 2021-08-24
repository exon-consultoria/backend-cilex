import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private groupModuleRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.groupModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Segment/Module with given ID");
    }

    await this.groupModuleRepository.delete(result);
  }
}
