import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SegmentModule from '../infra/typeorm/entities/SegmentModule';
import ISegmentModule from '../repositories/ISegmentModule';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute(id: string): Promise<SegmentModule> {
    const result = await this.segmentModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no segment/module with given ID");
    }

    return result;
  }
}
