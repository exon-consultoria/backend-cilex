import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Pet from '../infra/typeorm/entities/Pet';

export default interface IEntityRepository {
  findAll(): Promise<Pet[]>;
  findById(id: string): Promise<Pet | undefined>;
  findByCode(code: string): Promise<Pet | undefined>;
  create(data: ICreateEntityDTO): Promise<Pet>;
  update(entity: Pet): Promise<Pet>;
  delete(entity: Pet): Promise<void>;
}
