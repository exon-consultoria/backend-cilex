import ICreateSegmentModule from '../dtos/ICreateSegmentModule';
import SegmentModules from '../infra/typeorm/entities/SegmentModule';

export default interface ISegmentModule {
  findAll(): Promise<SegmentModules[]>;
  findById(id: string): Promise<SegmentModules | undefined>;
  findBySegment(id: string): Promise<SegmentModules[]>;
  findByModule(id: string): Promise<SegmentModules[]>;
  create(data: ICreateSegmentModule): Promise<SegmentModules>;
  update(entity: SegmentModules): Promise<SegmentModules>;
  delete(entity: SegmentModules): Promise<void>;
}
