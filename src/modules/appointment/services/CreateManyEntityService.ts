import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPetRepository from '@modules/pet/repositories/IEntityRepository';
import IWorkRepository from '@modules/work/repositories/IEntityRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  owner_id: string;
  recurrence?: string;
  work_id: string;
  pet_id: string;
  date: string;
  hour: string;
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

  public async execute(appointments: IRequestDTO[]): Promise<Appointment[]> {
    await Promise.all(
      appointments.map(async appointment => {
        const checkPet = await this.petRepository.findById(appointment.pet_id);

        if (!checkPet) {
          throw new AppError('No pet found with the given ID');
        }

        const checkWork = await this.workRepository.findById(
          appointment.work_id,
        );
        // Checar ID do serviço
        if (!checkWork) {
          throw new AppError('No work with this ID');
        }
      }),
    );

    const result = await this.entityRepository.createMany(appointments);

    return result;
  }
}
