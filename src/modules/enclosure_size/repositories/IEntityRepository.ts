import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import EnclosureSize from '../infra/typeorm/entities/EnclosureSize';

export default interface IEntityRepository {
  findAll(): Promise<EnclosureSize[]>;
  findById(id: string): Promise<EnclosureSize | undefined>;
  findByCode(code: string): Promise<EnclosureSize | undefined>;
  create(data: ICreateEntityDTO[]): Promise<EnclosureSize[]>;
  update(entity: EnclosureSize): Promise<EnclosureSize>;
  delete(entity: EnclosureSize): Promise<void>;
}
