import SegmentModule from '@modules/segment_module/infra/typeorm/entities/SegmentModule';
import ISegmentModule from '@modules/segment_module/repositories/ISegmentModule';
import { inject, injectable } from 'tsyringe';
import Segment from '../infra/typeorm/entities/Segment';
import IEntityRepository from '../repositories/IEntityRepository';

interface ISegmentsFormatted {
  id?: string;
  name?: string;
  description?: string;
  classIcon?: string;

  modules?: [];
}

@injectable()
export default class ListSegmentModule {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,

    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute(): Promise<any> {
    let resultModules: {};

    return this.entityRepository.findAll().then(async res => {
      resultModules = await Promise.all(
        res.map(async seg => {
          const modules = await this.segmentModuleRepository.findBySegmentFormatted(
            seg.id,
          );

          return {
            ...seg,
            modules,
          };
        }),
      );

      return resultModules;
    });
  }
}
