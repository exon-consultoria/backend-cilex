import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEntityService from '@modules/pending_user/services/CreateEntityService';
import ListEntityService from '@modules/pending_user/services/ListEntityService';
import ShowEntityService from '@modules/pending_user/services/ShowEntityService';
import DeleteEntityService from '@modules/pending_user/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { person_id } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      person_id,
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

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteService = container.resolve(DeleteEntityService);

    const result = await deleteService.execute(id);

    return res.json(classToClass(result));
  }
}
