import { inject, injectable } from 'tsyringe';
import Pet from '../infra/typeorm/entities/Pet';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Pet[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
