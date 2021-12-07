import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPetVaccineRepository from '@modules/pet_vaccine/repositories/IEntityRepository';
import IVaccineRepository from '@modules/vaccine/repositories/IEntityRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import Pet from '../infra/typeorm/entities/Pet';

interface IRequestDTO {
  id: string;
  name?: string;
  breed?: string;
  born_at?: string;
  gender?: string;
  sociable?: boolean;
  castrated?: boolean;
  items?: string;
  vaccines?: string[];
  enclosure_id?: string;
  owner_id?: string;
  note?: string;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('PetRepository')
    private entityRepository: IEntityRepository,

    @inject('PetVaccineRepository')
    private petVaccineRepository: IPetVaccineRepository,

    @inject('VaccineRepository')
    private vaccineRepository: IVaccineRepository,
  ) {}

  public async execute({
    id,
    name,
    breed,
    born_at,
    gender,
    sociable,
    vaccines,
    castrated,
    items,
    enclosure_id,
    owner_id,
    note,
  }: IRequestDTO): Promise<Pet> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (vaccines) {
      const petVaccines = await this.petVaccineRepository.findByPet(id);
      petVaccines.forEach(async groupModule => {
        await this.petVaccineRepository.delete(groupModule);
      });

      // Create PetVaccine relation
      vaccines.forEach(async vax => {
        // check if there's an vaccine with given id
        const checkVax = await this.vaccineRepository.findById(vax);
        if (!checkVax) {
          throw new AppError(`No vaccine with given ID: ${vax}`);
        }

        // check if there's already a relation between vax and pet

        const checkRelation = await this.petVaccineRepository.findRelation(
          vax,
          id,
        );

        if (checkRelation) {
          throw new AppError(
            `There's already a pet/vaccine relation with ID: ${checkRelation.id}`,
          );
        }

        await this.petVaccineRepository.create({
          pet_id: id,
          vaccine_id: vax,
        });
      });
    }

    entity.name = name || entity.name;
    entity.breed = breed || entity.breed;
    entity.born_at = born_at || entity.born_at;
    entity.gender = gender || entity.gender;
    entity.sociable = sociable || entity.sociable;
    entity.castrated = castrated || entity.castrated;
    entity.items = items || entity.items;
    entity.enclosure_id = enclosure_id || entity.enclosure_id;
    entity.owner_id = owner_id || entity.owner_id;
    entity.note = note || entity.note;

    return this.entityRepository.update(entity);
  }
}
