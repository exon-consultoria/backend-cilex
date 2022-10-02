import AppError from '@shared/errors/AppError';
import FakeCompanyRepository from '../repositories/fakes/FakeCompanyRepository';
import DeleteCompanyService from './DeleteCompanyService';

let fakeCompanyRepository: FakeCompanyRepository;
let deleteCompany: DeleteCompanyService;

describe('Show Company', () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompanyRepository();
    deleteCompany = new DeleteCompanyService(fakeCompanyRepository);
  });

  it('should be able to delete a company', async () => {
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

    await fakeCompanyRepository.create({
      code: '02',
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

    await deleteCompany.execute(comp1.id);

    const companies = await fakeCompanyRepository.findAll();

    expect(companies).toHaveLength(1);
  });

  it('should not be able to delete an unexisted company', async () => {
    await expect(deleteCompany.execute('no-valid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
