import AppError from '@shared/errors/AppError';
import FakePersonRepository from '../repositories/fakes/FakePersonRepository';
import DeleteEntityService from './DeleteEntityService';

let fakePersonRepository: FakePersonRepository;
let deletePerson: DeleteEntityService;

describe('Delete Entity', () => {
  beforeEach(() => {
    fakePersonRepository = new FakePersonRepository();
    deletePerson = new DeleteEntityService(fakePersonRepository);
  });

  it('should be able to delete an entity', async () => {
    const entity1 = await fakePersonRepository.create({
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

    await deletePerson.execute(entity1.id);

    const entities = await fakePersonRepository.findAll();

    expect(entities).toHaveLength(1);
  });

  it('should not be able to delete an unexisted company', async () => {
    await expect(deletePerson.execute('no-valid-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
