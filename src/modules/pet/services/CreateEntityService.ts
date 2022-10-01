import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPetVaccineRepository from '@modules/pet_vaccine/repositories/IEntityRepository';
import IVaccineRepository from '@modules/vaccine/repositories/IEntityRepository';
import Pet from '../infra/typeorm/entities/Pet';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  name: string;
  breed?: string;
  born_at?: string;
  gender?: string;
  sociable?: boolean;
  castrated?: boolean;
  items?: string;
  enclosure_id?: string;
  vaccines?: string[];
  owner_id: string;
  note?: string;
  size: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,

    @inject('PetVaccineRepository')
    private petVaccineRepository: IPetVaccineRepository,

    @inject('VaccineRepository')
    private vaccineRepository: IVaccineRepository,
  ) {}

  public async execute({
    name,
    breed,
    born_at,
    gender,
    sociable,
    castrated,
    items,
    enclosure_id,
    vaccines,
    owner_id,
    note,
    size,
  }: IRequestDTO): Promise<Pet> {
    const result = await this.entityRepository.create({
      name,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      enclosure_id,
      owner_id,
      note,
      size,
    });

    if (vaccines) {
      vaccines.forEach(async vax => {
        const checkVaccine = await this.vaccineRepository.findById(vax);
        if (!checkVaccine) {
          throw new AppError(`No vaccine with given ID: ${vax}`);
        }

        await this.petVaccineRepository.create({
          vaccine_id: vax,
          pet_id: result.id,
        });
      });
    }

    return result;
  }
}
