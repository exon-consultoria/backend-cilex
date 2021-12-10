import ICreateEntityDTO from '@modules/pet_vaccine/dtos/ICreateEntityDTO';
import IEntityRepository from '@modules/pet_vaccine/repositories/IEntityRepository';
import { getRepository, Repository } from 'typeorm';
import PetVaccine from '../entities/PetVaccine';

class EntityRepository implements IEntityRepository {
  private ormRepository: Repository<PetVaccine>;

  constructor() {
    this.ormRepository = getRepository(PetVaccine);
  }

  // public async findByGroupFormatted(id: string): Promise<PetVaccine[]> {
  //   const result = await this.ormRepository.query(`
  //   SELECT
  //     modules.title,
  //     modules.url,
  //     modules.description,
  //     modules."classIcon" as moduleClassIcon
  //   FROM
  //     group_modules
  //   INNER JOIN modules ON group_modules.module_id = modules.id
  //   WHERE group_modules.group_id='${id}'
  //   `);
  //   return result;
  // }

  public async findRelation(
    pet: string,
    vaccine: string,
  ): Promise<PetVaccine | undefined> {
    const result = await this.ormRepository.findOne({
      where: { pet, vaccine },
    });

    return result;
  }

  public async findAll(): Promise<PetVaccine[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<PetVaccine | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByPet(id: string): Promise<PetVaccine[]> {
    const result = await this.ormRepository.find({ where: { pet_id: id } });

    return result;
  }

  public async findByVaccine(id: string): Promise<PetVaccine[]> {
    const result = await this.ormRepository.find({ where: { vaccine_id: id } });

    return result;
  }

  public async create({
    pet_id,
    vaccine_id,
  }: ICreateEntityDTO): Promise<PetVaccine> {
    const result = this.ormRepository.create({
      vaccine_id,
      pet_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: PetVaccine): Promise<PetVaccine> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: PetVaccine): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
