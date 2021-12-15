import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPetRepository from '@modules/pet/repositories/IEntityRepository';
import IWorkRepository from '@modules/work/repositories/IEntityRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  recurrence: string;
  date: string;
  hour: string;
  pet_id: string;
  work_id: string;
  done: boolean;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('AppointmentRepository')
    private entityRepository: IEntityRepository,

    @inject('PetRepository')
    private petRepository: IPetRepository,

    @inject('WorkRepository')
    private workRepository: IWorkRepository,
  ) {}

  public async execute({
    date,
    hour,
    pet_id,
    work_id,
    recurrence,
    done,
  }: IRequestDTO): Promise<Appointment> {
    const checkPet = await this.petRepository.findById(pet_id);
    if (!checkPet) {
      throw new AppError('No pet found with the given ID');
    }

    // Checar ID do serviço
    const checkWork = await this.workRepository.findById(work_id);
    if (!checkWork) {
      throw new AppError('No work with this ID');
    }

    console.log(hour);

    const result = await this.entityRepository.create({
      date,
      hour,
      pet_id,
      work_id,
      owner_id: checkPet.owner_id,
      recurrence,
      done,
    });

    return result;
  }
}
