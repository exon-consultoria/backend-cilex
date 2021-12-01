import { inject, injectable } from 'tsyringe';
import Vaccine from '../infra/typeorm/entities/Vaccine';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('VaccineRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Vaccine[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
