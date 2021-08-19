import Module from '@modules/module/infra/typeorm/entities/Module';
import Segment from '@modules/segment/infra/typeorm/entities/Segment';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('segment_modules')
class SegmentModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module_id: string;

  @ManyToOne(() => Module)
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column()
  segment_id: string;

  @ManyToOne(() => Segment)
  @JoinColumn({ name: 'segment_id' })
  segment: Segment;
}

export default SegmentModule;
