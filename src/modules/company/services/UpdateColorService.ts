import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  id: string;
  company_color?: string;
}

@injectable()
export default class UpdateColorService {
  constructor(
    @inject('CompanyRepository')
    private entityRepository: ICompanyRepository,
  ) {}

  public async execute({ id, company_color }: IRequestDTO): Promise<Company> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    entity.company_color = company_color || entity.company_color;

    return this.entityRepository.update(entity);
  }
}
