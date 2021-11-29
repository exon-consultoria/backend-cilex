import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import deleteFile from '../../../utils/file';
import IEntityRepository from '../repositories/IEntityRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequestDTO {
  id: string;
  name?: string;
  picture?: string;
  breed?: string;
  born_at?: string;
  gender?: string;
  sociable?: boolean;
  castrated?: boolean;
  items?: string;
  localization?: string;
  vaccines?: string;
  owner_id?: string;
  note?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({
    id,
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
  }: IRequestDTO): Promise<Product> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    entity.name = name || entity.name;
    entity.picture = picture || entity.picture;
    entity.breed = breed || entity.breed;
    entity.born_at = born_at || entity.born_at;
    entity.gender = gender || entity.gender;
    entity.sociable = sociable || entity.sociable;
    entity.castrated = castrated || entity.castrated;
    entity.items = items || entity.items;
    // entity.localization = localization || entity.localization;
    // entity.vaccines = vaccines || entity.vaccines;
    entity.owner_id = owner_id || entity.owner_id;
    entity.note = note || entity.note;

    return this.entityRepository.update(entity);
  }
}
