import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEntityRepository from '../repositories/IEntityRepository';
import Role from '../infra/typeorm/entities/Role';

interface IRequestDTO {
  id: string;
  code?: string;
  role?: string;
  description?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('RoleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
    role,
    description,
    code,
  }: IRequestDTO): Promise<Role> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (code && code !== entity.code) {
      const checkCodExist = await this.entityRepository.findByCode(code);

      if (checkCodExist) {
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    entity.code = code || entity.code;
    entity.role = role || entity.role;
    entity.description = description || entity.description;

    return this.entityRepository.update(entity);
  }
}
