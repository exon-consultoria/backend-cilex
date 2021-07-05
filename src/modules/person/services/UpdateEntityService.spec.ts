import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import UpdatePersonService from './UpdateEntityService';

let fakePersonRepository: FakePersonRepository;
let updatePerson: UpdatePersonService;

describe('Should be able to update entity', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();
    updatePerson = new UpdatePersonService(fakePersonRepository);
  });

  it('should be able to update a company', async () => {
    const entity = await fakePersonRepository.create({
      code: '01',
      cnpj: '41427449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
      isUser: false,
      tipo: 'Vendedor',
    });

    await updatePerson.execute({
      id: entity.id,
      code: '02',
    });
  });

  it('should not be able to update an entity code for one already used', async () => {
    const entity = await fakePersonRepository.create({
      code: '01',
      cnpj: '41427449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
      isUser: false,
      tipo: 'Vendedor',
    });

    await fakePersonRepository.create({
      code: '02',
      cnpj: '41427449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
      isUser: false,
      tipo: 'Vendedor',
    });

    await expect(
      updatePerson.execute({
        id: entity.id,
        code: '02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an unexisted entity', async () => {
    await expect(
      updatePerson.execute({
        id: 'novalid-id',
        code: '02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
