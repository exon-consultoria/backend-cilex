import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Role from '../infra/typeorm/entities/Role';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  code: string;
  role: string;
  description: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('RoleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    code,
    role,
    description,
  }: IRequestDTO): Promise<Role> {
    if (code) {
      const checkCodeExist = await this.entityRepository.findByCode(code);

      if (checkCodeExist) {
        throw new AppError(
          "There's already an entity registered with the same code",
        );
      }
    }

    const result = await this.entityRepository.create({
      code,
      role,
      description,
    });

    return result;
  }
}
