import { inject, injectable } from 'tsyringe';
import Enclosure from '../infra/typeorm/entities/Enclosure';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('EnclosureRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Enclosure[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
