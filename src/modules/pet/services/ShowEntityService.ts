import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Pet from '../infra/typeorm/entities/Pet';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Pet> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no type with given ID");
    }

    return result;
  }
}
