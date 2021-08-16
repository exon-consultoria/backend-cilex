// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import PendingUser from '../infra/typeorm/entities/PendingUser';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  person_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PendingUserRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ person_id }: IRequestDTO): Promise<PendingUser> {
    const checkPersonExist = await this.entityRepository.findByPersonId(
      person_id,
    );

    if (checkPersonExist) {
      throw new AppError("There's already an pending user for this person");
    }

    const result = await this.entityRepository.create({
      person_id,
    });

    return result;
  }
}
