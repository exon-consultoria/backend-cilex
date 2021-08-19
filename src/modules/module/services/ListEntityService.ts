import { inject, injectable } from 'tsyringe';
import Module from '../infra/typeorm/entities/Module';
import IEntityRepository from '../repositories/IEntityRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('ModuleRepository')
    private entityRepository: IEntityRepository,
  ) {}

  public async execute(): Promise<Module[]> {
    const result = await this.entityRepository.findAll();

    return result;
  }
}
