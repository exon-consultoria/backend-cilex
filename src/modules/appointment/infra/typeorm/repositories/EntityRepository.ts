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
    const result = this.ormRepository.create(appointments);

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Appointment): Promise<Appointment> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Appointment): Promise<void> {
    await this.ormRepository.remove(entity);
  }

  public async deleteByIds(ids: string): Promise<void> {
    const allIds = ids.split(',');
    this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(Appointment)
      .where('id In (:...ids)', { ids: allIds })
      .execute();
  }

  public async deleteByDate(date: string): Promise<void> {
    const formatDate = date.replace('-', '/');
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .from(Appointment)
      .where('date > :date_param', { date_param: formatDate })
      .execute();
  }
}

export default EntityRepository;
