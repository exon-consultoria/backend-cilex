import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import CreateCompanyService from './CreateCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;

let createCompany: CreateCompanyService;

describe('Create Company', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();

    createCompany = new CreateCompanyService(fakeCompanyRepository);
  });

  it('should be able to create a new company', async () => {
    const company = await createCompany.execute({
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
    expect(company).toHaveProperty('id');
  });

  it('should NOT be able to create a new company with same cod', async () => {
    await createCompany.execute({
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

    await expect(
      createCompany.execute({
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
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
