import ICreatePersonDTO from '../dtos/ICreatePersonDTO';
import Person from '../infra/typeorm/entities/Person';

export default interface IPersonRepository {
  findAll(): Promise<Person[]>;
  findById(id: string): Promise<Person | undefined>;
  findByCod(cod: string): Promise<Person | undefined>;
  create(data: ICreatePersonDTO): Promise<Person>;
  update(entity: Person): Promise<Person>;
  delete(entity: Person): Promise<void>;
}
