import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWorkRepository from '@modules/work/repositories/IEntityRepository';
import IPetRepository from '@modules/pet/repositories/IEntityRepository';
import IEntityRepository from '../repositories/IEntityRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequestDTO {
  id: string;
  recurrence?: string;
  date?: string;
  hour?: string;
  pet_id?: string;
  work_id?: string;
  done: boolean;
}

@injectable()
export default class UpdateEntityService {
  constructor(
    @inject('AppointmentRepository')
    private entityRepository: IEntityRepository,

    @inject('PetRepository')
    private petRepository: IPetRepository,

    @inject('WorkRepository')
    private workRepository: IWorkRepository,
  ) {}

  public async execute({
    id,
    recurrence,
    date,
    hour,
    pet_id,
    work_id,
    done,
  }: IRequestDTO): Promise<Appointment> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new AppError("There's no entity with given ID");
    }

    if (done !== entity.done) {
      entity.done = done;
    }

    entity.recurrence = recurrence || entity.recurrence;
    entity.date = date || entity.date;
    entity.hour = hour || entity.hour;
    entity.pet_id = pet_id || entity.pet_id;
    entity.work_id = work_id || entity.work_id;

    return this.entityRepository.update(entity);
  }
}
