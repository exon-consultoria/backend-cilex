import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/person/services/CreateEntityService';
import ListEntityService from '@modules/person/services/ListEntityService';
import ShowEntityService from '@modules/person/services/ShowEntityService';
import UpdateEntityService from '@modules/person/services/UpdateEntityService';
import DeleteEntityService from '@modules/person/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      code,
      cpf,
      cnpj,
      nome,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      isUser,
      tipo,
      role_id,
    } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      code,
      cpf,
      cnpj,
      nome,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      isUser,
      tipo,
      role_id,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listEntity = container.resolve(ListEntityService);

    const list = await listEntity.execute();

    return res.json(classToClass(list));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showService = container.resolve(ShowEntityService);

    const result = await showService.execute(id);

    return res.json(classToClass(result));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      code,
      cpf,
      cnpj,
      nome,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      isUser,
      tipo,
      role_id,
    } = req.body;

    const { id } = req.params;
    console.log(isUser);

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      code,
      cpf,
      cnpj,
      nome,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      isUser,
      tipo,
      role_id,
    });

    return res.json(entity);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteService = container.resolve(DeleteEntityService);

    const result = await deleteService.execute(id as string);

    return res.json(classToClass(result));
  }
}
