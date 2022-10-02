import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import ShowCompanyService from './ShowCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let showCompany: ShowCompanyService;

describe('Show Company', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    showCompany = new ShowCompanyService(fakeCompanyRepository);
  });

  it('should be able to show a company', async () => {
    const comp1 = await fakeCompanyRepository.create({
      code: '01',
      cnpj: '41321449000118',
      razao_social: 'Acme Corp.',
      nome_fantasia: 'Acme',
      email: 'acme@acmecorp.com',
      tel: '47988993014',
      endereco: 'Rua Saudades, 572',
      cep: '89120000',
      uf: 'Santa Catarina',
      info: 'acme corp lorem ipsu ignis',
    });

    const company = await showCompany.execute(comp1.id);

    expect(company).toHaveProperty('id');
  });

  it('should not be able to show an unexisted company', async () => {
    await expect(showCompany.execute('no-valid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
