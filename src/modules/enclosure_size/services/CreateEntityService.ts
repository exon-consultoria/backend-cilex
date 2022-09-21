import { inject, injectable } from 'tsyringe';
import EnclosureSize from '../infra/typeorm/entities/EnclosureSize';

import IEntityRepository from '../repositories/IEntityRepository';

interface IRequestDTO {
  size: string;
  capacity: number;
}

@injectable()
export default class CreateEntityService {
  constructor(
    @inject('EnclosureSizeRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(enclosureSize: IRequestDTO[]): Promise<EnclosureSize[]> {
    const result = await this.entityRepository.create(enclosureSize);

    return result;
  }
}
