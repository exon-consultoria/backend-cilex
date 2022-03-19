import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import deleteFile from '@utils/file';
import ICompanyRepository from '../repositories/ICompanyRepository';
import Company from '../infra/typeorm/entities/Company';

interface IRequestDTO {
  id: string;
}

@injectable()
export default class ResetCompany {
  constructor(
    @inject('CompanyRepository')
    private entityRepository: ICompanyRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Company> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (entity.company_logo && entity.company_logo !== 'cilex.png') {
      await deleteFile(`./tmp/${entity.company_logo}`);
    }

    entity.company_logo = 'cilex.png';
    entity.company_color = '#FF7A00';

    return this.entityRepository.update(entity);
  }
}
