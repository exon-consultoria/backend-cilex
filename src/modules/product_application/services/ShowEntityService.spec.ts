import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import ShowPersonService from './ShowEntityService';

let fakePersonRepository: FakePersonRepository;
let showPerson: ShowPersonService;

describe('Show entity', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();
    showPerson = new ShowPersonService(fakePersonRepository);
  });

  it('should be able to show an entity', async () => {
    const comp1 = await fakePersonRepository.create({
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

    const entity = await showPerson.execute(comp1.id);

    expect(entity).toHaveProperty('id');
  });

  it('should not be able to show an unexisted entity', async () => {
    await expect(showPerson.execute('no-valid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
