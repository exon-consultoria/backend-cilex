import { inject, injectable } from 'tsyringe';
import SegmentModule from '../infra/typeorm/entities/SegmentModule';
import ISegmentModule from '../repositories/ISegmentModule';

interface IRequest {
  module_id: string | undefined;
  segment_id: string | undefined;
}

@injectable()
export default class ListEntityService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute({
    segment_id,
    module_id,
  }: IRequest): Promise<SegmentModule[]> {
    let result = await this.segmentModuleRepository.findAll();

    if (module_id) {
      result = await this.segmentModuleRepository.findByModule(module_id);
    }

    if (segment_id) {
      result = await this.segmentModuleRepository.findBySegment(segment_id);
    }

    return result;
  }
}
