import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.companyModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Segment/Module with given ID");
    }

    await this.companyModuleRepository.delete(result);
  }
}
