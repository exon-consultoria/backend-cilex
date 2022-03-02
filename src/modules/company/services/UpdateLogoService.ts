import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import deleteFile from '@utils/file';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  id: string;
  company_logo?: string;
}

@injectable()
export default class UpdateLogoService {
  constructor(
    @inject('CompanyRepository')
    private entityRepository: ICompanyRepository,
  ) {}

  public async execute({ id, company_logo }: IRequestDTO): Promise<Company> {
    console.log(company_logo);
    
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (entity.company_logo) {
      await deleteFile(`./tmp/company/${entity.company_logo}`);
    }

    entity.company_logo = company_logo || entity.company_logo;

    return this.entityRepository.update(entity);
  }
}
