import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import deleteFile from 'utils/file';
import Pet from '../infra/typeorm/entities/Pet';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  name: string;
  picture: string;
  breed: string;
  born_at: string;
  gender: string;
  sociable: boolean;
  castrated: boolean;
  items: string;
  localization: string;
  vaccines: string;
  owner_id: string;
  note: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    name,
    picture,
    breed,
    born_at,
    gender,
    sociable,
    castrated,
    items,
    localization,
    vaccines,
    owner_id,
    note,
  }: IRequestDTO): Promise<Pet> {
    const result = await this.entityRepository.create({
      name,
      picture,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      localization,
      vaccines,
      owner_id,
      note,
    });

    return result;
  }
}
