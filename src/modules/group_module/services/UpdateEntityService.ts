import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import GroupModule from '../infra/typeorm/entities/GroupModule';

interface IRequestDTO {
  id: string;
  name: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ id, name }: IRequestDTO): Promise<GroupModule> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    entity.name = name || entity.name;

    return this.entityRepository.update(entity);
  }
}
