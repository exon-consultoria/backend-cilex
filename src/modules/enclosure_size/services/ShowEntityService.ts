import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import EnclosureSize from '../infra/typeorm/entities/EnclosureSize';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('EnclosureSizeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<EnclosureSize> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Enclosure with given ID");
    }

    return result;
  }
}
