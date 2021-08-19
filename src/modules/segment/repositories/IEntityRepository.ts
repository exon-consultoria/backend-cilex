import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Segment from '../infra/typeorm/entities/Segment';

export default interface IEntityRepository {
  findAll(): Promise<Segment[]>;
  findById(id: string): Promise<Segment | undefined>;
  create(data: ICreateEntityDTO): Promise<Segment>;
  update(entity: Segment): Promise<Segment>;
  delete(entity: Segment): Promise<void>;
}
