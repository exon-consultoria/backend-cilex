import SegmentModule from '@modules/segment_module/infra/typeorm/entities/SegmentModule';
import ISegmentModule from '@modules/segment_module/repositories/ISegmentModule';
import { inject, injectable } from 'tsyringe';
import Segment from '../infra/typeorm/entities/Segment';
import IEntityRepository from '../repositories/IEntityRepository';

interface IRequest {}

@injectable()
export default class ListSegmentModule {
  constructor(
    @inject('SegmentRepository')
    private entityRepository: IEntityRepository,

    @inject('SegmentModuleRepository')
    private segmentModuleRepository: ISegmentModule,
  ) {}

  public async execute(): Promise<any> {
    const result = await this.entityRepository.findAll();

    const resultModules = result.map(async seg => {
          const modules = await this.segmentModuleRepository.findBySegmentFormatted(
            seg.id,
          );

          return {
            ...seg,
            modules,
          };

    // const resultModules = new Promise((res, rej) => {
    //   const i = result.map(async seg => {
    //     const modules = await this.segmentModuleRepository.findBySegmentFormatted(
    //       seg.id,
    //     );

    //     return {
    //       ...seg,
    //       modules,
    //     };
    //   });

    // })

    return resultModules;
  }
}
