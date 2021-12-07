import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import ListPeopleService from './ListEntityService';

let fakePersonRepository: FakePersonRepository;
let listPeople: ListPeopleService;

describe('List Companies', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();
    listPeople = new ListPeopleService(fakePersonRepository);
  });

  it('should be able to list all entities', async () => {
    await fakePersonRepository.create({
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
      code: '0101',
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

    const companies = await listPeople.execute();

    expect(companies).toHaveLength(2);
  });
});
