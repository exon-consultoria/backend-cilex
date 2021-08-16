import ICreateEntityDTO from '@modules/pending_user/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/pending_user/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import PendingUser from '../entities/PendingUser';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<PendingUser>;

  constructor() {
    this.ormRepository = getRepository(PendingUser);
  }

  public async findByPersonId(
    person_id: string,
  ): Promise<PendingUser | undefined> {
    const result = await this.ormRepository.findOne({
      where: { person_id },
    });

    return result;
  }

  public async findAll(): Promise<PendingUser[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<PendingUser | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async create({ person_id }: ICreateEntityDTO): Promise<PendingUser> {
    const result = this.ormRepository.create({
      person_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async delete(entity: PendingUser): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
