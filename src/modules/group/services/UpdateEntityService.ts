import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Group from '../infra/typeorm/entities/Group';

interface IRequestDTO {
  id: string;
  code?: string;
  description?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('GroupRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ id, description, code }: IRequestDTO): Promise<Group> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.entityRepository.findByCode(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already a entity registered with the same code",
        );
      }
    }

    entity.code = code || entity.code;
    entity.description = description || entity.description;

    return this.entityRepository.update(entity);
  }
}
