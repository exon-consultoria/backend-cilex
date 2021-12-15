import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import deleteFile from '@utils/file';
import IEntityRepository from '../repositories/IEntityRepository';
import Pet from '../infra/typeorm/entities/Pet';

interface IRequestDTO {
  id: string;
  picture?: string;
}

@injectable()
export default class UpdatePictureEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute({ id, picture }: IRequestDTO): Promise<Pet> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (entity.picture) {
      await deleteFile(`./tmp/pets/${entity.picture}`);
    }

    entity.picture = picture || entity.picture;

    return this.entityRepository.update(entity);
  }
}
