// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import GroupModule from '../infra/typeorm/entities/GroupModule';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  name: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('GroupModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ name }: IRequestDTO): Promise<GroupModule> {
    const result = await this.entityRepository.create({
      name,
    });

    return result;
  }
}
