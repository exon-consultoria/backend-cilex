import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISegmentModule from '../repositories/ISegmentModule';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.segmentModuleRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Segment/Module with given ID");
    }

    await this.segmentModuleRepository.delete(result);
  }
}
