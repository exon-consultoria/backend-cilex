import { inject, injectable } from 'tsyringe';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class DeleteByIdsEntityService {
  constructor(
    @inject('AppointmentRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(ids: string): Promise<void> {
    await this.entityRepository.deleteByIds(ids);
  }
}
