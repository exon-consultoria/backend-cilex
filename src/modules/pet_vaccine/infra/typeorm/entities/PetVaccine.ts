import Pet from '@modules/pet/infra/typeorm/entities/Pet';
import Vaccine from '@modules/vaccine/infra/typeorm/entities/Vaccine';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('pet_vaccines')
class PetVaccine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, { eager: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  vaccine_id: string;

  @ManyToOne(() => Vaccine, { eager: true })
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: Vaccine;
}

export default PetVaccine;
