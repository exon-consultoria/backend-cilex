import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import Module from '../infra/typeorm/entities/Module';

export default interface IEntityRepository {
  findAll(): Promise<Module[]>;
  findById(id: string): Promise<Module | undefined>;
  create(data: ICreateEntityDTO): Promise<Module>;
  update(entity: Module): Promise<Module>;
  delete(entity: Module): Promise<void>;
}
