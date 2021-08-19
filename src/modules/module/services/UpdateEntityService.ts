import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Module from '../infra/typeorm/entities/Module';

interface IRequestDTO {
  id: string;
  title: string;
  description: string;
  classIcon: string;
  isActive: boolean;
  url: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('ModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    title,
    description,
    classIcon,
    isActive,
    url,
  }: IRequestDTO): Promise<Module> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (isActive !== entity.isActive) {
      entity.isActive = isActive;
    }

    entity.title = title || entity.title;
    entity.description = description || entity.description;
    entity.classIcon = classIcon || entity.classIcon;
    entity.url = url || entity.url;

    return this.entityRepository.update(entity);
  }
}
