import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import UpdateCompanyService from './UpdateCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let updateCompany: UpdateCompanyService;

describe('Should be able to Update Company', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    updateCompany = new UpdateCompanyService(fakeCompanyRepository);
  });

  it('should be able to update a company', async () => {
    const company = await fakeCompanyRepository.create({
      cod: '01',
      cnpj: '41427449000119',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
    });

    await updateCompany.execute({
      company_id: company.id,
      cod: '02',
    });
  });

  it('should not be able to update a company code for one already used', async () => {
    const company = await fakeCompanyRepository.create({
      cod: '01',
      cnpj: '41427449000119',
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
      cod: '02',
      cnpj: '41427449000119',
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
      updateCompany.execute({
        company_id: company.id,
        cod: '02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an unexisted company', async () => {
    await expect(
      updateCompany.execute({
        company_id: 'novalid-id',
        cod: '02',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
