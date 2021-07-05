import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IPersonRepository from '../repositories/IPersonRepository';

@injectable()
export default class DeleteEntityService {
  constructor(
    @inject('PersonRepository')
    private personRepository: IPersonRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const result = await this.personRepository.findById(id);

    if (!result) {
      throw new AppError("There's no person with given ID");
    }

    await this.personRepository.delete(result);
  }
}
