import { inject, injectable } from 'tsyringe';
import SegmentModule from '../infra/typeorm/entities/SegmentModule';
import ISegmentModule from '../repositories/ISegmentModule';

interface IRequest {
  segment_id: string | undefined;
}

@injectable()
export default class ListSegmentsModulesService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute({ segment_id }: IRequest): Promise<SegmentModule[]> {
    let result = await this.segmentModuleRepository.findAll();

    if (segment_id) {
      result = await this.segmentModuleRepository.findBySegmentFormatted(
        segment_id,
      );
    }

    return result;
  }
}
