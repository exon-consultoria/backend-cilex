import { inject, injectable } from 'tsyringe';
import Work from '../infra/typeorm/entities/Work';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('WorkRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Work[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
