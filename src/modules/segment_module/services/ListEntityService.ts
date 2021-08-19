import { inject, injectable } from 'tsyringe';
import SegmentModule from '../infra/typeorm/entities/SegmentModule';
import ISegmentModule from '../repositories/ISegmentModule';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute(
    module: string,
    segment: string,
  ): Promise<SegmentModule[]> {
    let result = await this.segmentModuleRepository.findAll();

    if (module) {
      result = await this.segmentModuleRepository.findByModule(module);
    }

    if (segment) {
      result = await this.segmentModuleRepository.findBySegment(segment);
    }

    return result;
  }
}
