import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Person from '../infra/typeorm/entities/Person';

import IPersonRepository from '../repositories/IPersonRepository';

@injectable()
export default class ShowEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,
  ) {}

  public async execute(id: string): Promise<Person> {
    const result = await this.personRepository.findById(id);

    if (!result) {
      throw new AppError("There's no person with given ID");
    }

    return result;
  }
}
