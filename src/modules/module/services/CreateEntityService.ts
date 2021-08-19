// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Module from '../infra/typeorm/entities/Module';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  title: string;
  description: string;
  classIcon: string;
  isActive: boolean;
  url: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('ModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    title,
    description,
    classIcon,
    isActive,
    url,
  }: IRequestDTO): Promise<Module> {
    const result = await this.entityRepository.create({
      title,
      description,
      classIcon,
      isActive,
      url,
    });

    return result;
  }
}
