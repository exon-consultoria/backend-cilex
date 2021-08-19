import ICreateSegmentModule from '@modules/segment_module/dtos/ICreateSegmentModule';
import ISegmentModule from '@modules/segment_module/repositories/ISegmentModule';
import { getRepository, Repository } from 'typeorm';
import SegmentModule from '../entities/SegmentModule';

class EntityRepository implements ISegmentModule {
  private ormRepository: Repository<SegmentModule>;

  constructor() {
    this.ormRepository = getRepository(SegmentModule);
  }

  public async findAll(): Promise<SegmentModule[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<SegmentModule | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findBySegment(id: string): Promise<SegmentModule[]> {
    const result = await this.ormRepository.find({ where: { segment_id: id } });

    return result;
  }

  public async findByModule(id: string): Promise<SegmentModule[]> {
    const result = await this.ormRepository.find({ where: { module_id: id } });

    return result;
  }

  public async create({
    module,
    segment,
  }: ICreateSegmentModule): Promise<SegmentModule> {
    const result = this.ormRepository.create({
      module_id: module,
      segment_id: segment,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: SegmentModule): Promise<SegmentModule> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: SegmentModule): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default EntityRepository;
