import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Enclosure from '../infra/typeorm/entities/Enclosure';

export default interface IEntityRepository {
  findAll(): Promise<Enclosure[]>;
  findById(id: string): Promise<Enclosure | undefined>;
  findByCode(code: string): Promise<Enclosure | undefined>;
  create(data: ICreateEntityDTO): Promise<Enclosure>;
  update(entity: Enclosure): Promise<Enclosure>;
  delete(entity: Enclosure): Promise<void>;
}
