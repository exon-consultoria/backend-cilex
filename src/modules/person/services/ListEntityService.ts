import { inject, injectable } from 'tsyringe';
import Person from '../infra/typeorm/entities/Person';

import IPersonRepository from '../repositories/IPersonRepository';

@injectable()
export default class ListEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,
  ) {}

  public async execute(): Promise<Person[]> {
    const result = await this.personRepository.findAll();

    return result;
  }
}
