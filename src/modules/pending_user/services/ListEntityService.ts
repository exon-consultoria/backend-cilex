import { inject, injectable } from 'tsyringe';
import PendingUser from '../infra/typeorm/entities/PendingUser';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('PendingUserRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<PendingUser[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
