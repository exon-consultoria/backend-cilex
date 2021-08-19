import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IModuleRepository from '@modules/module/repositories/IEntityRepository';
import ISegmentRepository from '@modules/segment/repositories/IEntityRepository';
import ISegmentModule from '@modules/segment_module/repositories/ISegmentModule';
import SegmentModule from '../infra/typeorm/entities/SegmentModule';

interface IRequestDTO {
  module: string;
  segment: string;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,

    @inject('ModuleRepository')
    private moduleRepository: IModuleRepository,

    @inject('SegmentRepository')
    private segmentRepository: ISegmentRepository,
  ) {}

  public async execute({
    segment,
    module,
  }: IRequestDTO): Promise<SegmentModule> {
    const checkEntity1 = await this.moduleRepository.findById(module);

    if (!checkEntity1) {
      throw new AppError('No module founded');
    }

    const checkEntity2 = await this.segmentRepository.findById(segment);

    if (!checkEntity2) {
      throw new AppError('No  segment founded');
    }

    const result = await this.segmentModuleRepository.create({
      segment,
      module,
    });

    return result;
  }
}
