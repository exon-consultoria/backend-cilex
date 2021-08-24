import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('CompanyModuleRepository')
    private companyModuleRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<CompanyModule> {
    const result = await this.companyModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no company/module with given ID");
    }

    return result;
  }
}
