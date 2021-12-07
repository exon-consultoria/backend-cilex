import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import PetVaccine from '../infra/typeorm/entities/PetVaccine';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('PetVaccineRepository')
    private petVaccineRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<PetVaccine> {
    const result = await this.petVaccineRepository.findById(id);

    if (!result) {
      throw new AppError("There's no pet/vaccine with given ID");
    }

    return result;
  }
}
