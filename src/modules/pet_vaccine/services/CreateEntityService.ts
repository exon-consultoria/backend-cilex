import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPetRepository from '@modules/pet/repositories/IEntityRepository';
import IVaccineRepository from '@modules/vaccine/repositories/IEntityRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import PetVaccine from '../infra/typeorm/entities/PetVaccine';

interface IRequestDTO {
  pet_id: string;
  vaccine_id: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PetVaccineRepository')
    private PetVaccineRepository: IEntityRepository,

    @inject('PetRepository')
    private petRepository: IPetRepository,

    @inject('VaccineRepository')
    private vaccineRepository: IVaccineRepository,
  ) {}

  public async execute({
    vaccine_id,
    pet_id,
  }: IRequestDTO): Promise<PetVaccine> {
    const checkEntity1 = await this.petRepository.findById(pet_id);

    if (!checkEntity1) {
      throw new AppError('No pet founded');
    }

    const checkEntity2 = await this.vaccineRepository.findById(vaccine_id);

    if (!checkEntity2) {
      throw new AppError('No vaccine founded');
    }

    const result = await this.PetVaccineRepository.create({
      vaccine_id,
      pet_id,
    });

    return result;
  }
}
