import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('AppointmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(date: string): Promise<Appointment[]> {
    let result = await this.entityRepository.findAll();

    if (date) {
      result = await this.entityRepository.findByDate(date);
    }

    return result;
  }
}
