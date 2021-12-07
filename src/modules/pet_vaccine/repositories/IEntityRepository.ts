import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import PetVaccine from '../infra/typeorm/entities/PetVaccine';

export default interface IEntityRepository {
  findAll(): Promise<PetVaccine[]>;
  findById(id: string): Promise<PetVaccine | undefined>;
  findByPet(id: string): Promise<PetVaccine[]>;
  // findByGroupFormatted(id: string): Promise<PetVaccine[]>;
  findByVaccine(id: string): Promise<PetVaccine[]>;
  findRelation(pet: string, vaccine: string): Promise<PetVaccine | undefined>;
  create(data: ICreateEntityDTO): Promise<PetVaccine>;
  update(entity: PetVaccine): Promise<PetVaccine>;
  delete(entity: PetVaccine): Promise<void>;
}
