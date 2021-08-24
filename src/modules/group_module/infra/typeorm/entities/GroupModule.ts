import Group from '@modules/group/infra/typeorm/entities/Group';
import Module from '@modules/module/infra/typeorm/entities/Module';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('group_modules')
class GroupModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module_id: string;

  @ManyToOne(() => Module)
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column()
  group_id: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'grou_id' })
  group: Group;
}

export default GroupModule;
