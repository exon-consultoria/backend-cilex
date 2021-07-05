import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import ListCompanyService from './ListCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let listCompanies: ListCompanyService;

describe('List Companies', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    listCompanies = new ListCompanyService(fakeCompanyRepository);
  });

  it('should be able to list all companies', async () => {
    await fakeCompanyRepository.create({
      cod: '01',
      cnpj: '41427449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
    });

    await fakeCompanyRepository.create({
      cod: '0101',
      cnpj: '41427449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
    });

    const companies = await listCompanies.execute();

    expect(companies).toHaveLength(2);
  });
});
