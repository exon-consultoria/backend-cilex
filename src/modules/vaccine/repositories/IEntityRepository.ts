import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Vaccine from '../infra/typeorm/entities/Vaccine';

export default interface IEntityRepository {
  findAll(): Promise<Vaccine[]>;
  findById(id: string): Promise<Vaccine | undefined>;
  findByCode(code: string): Promise<Vaccine | undefined>;
  create(data: ICreateEntityDTO): Promise<Vaccine>;
  update(entity: Vaccine): Promise<Vaccine>;
  delete(entity: Vaccine): Promise<void>;
}
