import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('PetVaccineRepository')
    private petVaccineRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.petVaccineRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Pet/Vaccine with given ID");
    }

    await this.petVaccineRepository.delete(result);
  }
}
