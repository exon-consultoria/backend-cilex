import ICreateEntityDTO from '@modules/appointment/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/appointment/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: string): Promise<Appointment[]> {
    const result = await this.ormRepository.find({
      where: {
        date,
      },
      order: { date: 'DESC' },
    });

    return result;
  }

  public async findAll(): Promise<Appointment[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Appointment | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    date,
    hour,
    pet_id,
    work_id,
    recurrence,
    done,
    owner_id,
  }: ICreateEntityDTO): Promise<Appointment> {
    const result = this.ormRepository.create({
      date,
      hour,
      pet_id,
      work_id,
      owner_id,
      recurrence,
      done,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async createMany(
    appointments: ICreateEntityDTO[],
  ): Promise<Appointment[]> {
    const allResults: Appointment[] = [];

    await Promise.all(
      appointments.map(async appointment => {
        const result = this.ormRepository.create({
          date: appointment.date,
          hour: appointment.hour,
          pet_id: appointment.pet_id,
          work_id: appointment.work_id,
          owner_id: appointment.owner_id,
          recurrence: appointment.recurrence,
          done: appointment.done,
        });
        await this.ormRepository.save(result);
        allResults.push(result);
      }),
    );

    return allResults;
  }

  public async update(entity: Appointment): Promise<Appointment> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Appointment): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
