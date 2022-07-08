import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IEntityRepository {
  findAll(): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | undefined>;
  findByDate(date: string): Promise<Appointment[]>;
  findByCode(code: string): Promise<Appointment | undefined>;
  create(data: ICreateEntityDTO): Promise<Appointment>;
  createMany(data: ICreateEntityDTO[]): Promise<Appointment[]>;
  update(entity: Appointment): Promise<Appointment>;
  delete(entity: Appointment): Promise<void>;
}
