import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import CreateEntityService from './CreateEntityService';

let fakePersonRepository: FakePersonRepository;

let createPerson: CreateEntityService;

describe('Create Person', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();

    createPerson = new CreateEntityService(fakePersonRepository);
  });

  it('should be able to create a new person', async () => {
    const entity = await createPerson.execute({
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
    expect(entity).toHaveProperty('id');
  });

  it('should NOT be able to create a new person with same code', async () => {
    await createPerson.execute({
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

    await expect(
      createPerson.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
