import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Enclosure from '../infra/typeorm/entities/Enclosure';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('EnclosureRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(id: string): Promise<Enclosure> {
    const result = await this.entityRepository.findById(id);

    if (!result) {
      throw new AppError("There's no Enclosure with given ID");
    }

    return result;
  }
}
