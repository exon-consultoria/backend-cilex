import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Work from '../infra/typeorm/entities/Work';

export default interface IEntityRepository {
  findAll(): Promise<Work[]>;
  findById(id: string): Promise<Work | undefined>;
  findByCode(code: string): Promise<Work | undefined>;
  create(data: ICreateEntityDTO): Promise<Work>;
  update(entity: Work): Promise<Work>;
  delete(entity: Work): Promise<void>;
}
