import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Vaccine from '../infra/typeorm/entities/Vaccine';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('VaccineRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Vaccine> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Vaccine with given ID");
    }

    return result;
  }
}
