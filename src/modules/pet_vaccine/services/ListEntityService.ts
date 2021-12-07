import { inject, injectable } from 'tsyringe';
import PetVaccine from '../infra/typeorm/entities/PetVaccine';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {
  pet_id: string | undefined;
  vaccine_id: string | undefined;
}

@injectable()
export default class ListEntityService {
  constructor(
    @inject('PetVaccineRepository')
    private petVaccineRepository: IEntityRepository,
  ) {}

  public async execute({
    vaccine_id,
    pet_id,
  }: IRequest): Promise<PetVaccine[]> {
    let result = await this.petVaccineRepository.findAll();

    if (pet_id) {
      result = await this.petVaccineRepository.findByPet(pet_id);
    }

    if (vaccine_id) {
      result = await this.petVaccineRepository.findByVaccine(vaccine_id);
    }

    return result;
  }
}
