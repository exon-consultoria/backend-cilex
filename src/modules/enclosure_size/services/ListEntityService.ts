import { inject, injectable } from 'tsyringe';
import EnclosureSize from '../infra/typeorm/entities/EnclosureSize';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('EnclosureSizeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<EnclosureSize[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
