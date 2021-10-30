import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/product_um/services/CreateEntityService';
import ListEntityService from '@modules/product_um/services/ListEntityService';
import ShowEntityService from '@modules/product_um/services/ShowEntityService';
import UpdateEntityService from '@modules/product_um/services/UpdateEntityService';
import DeleteEntityService from '@modules/product_um/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { code, description } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      code,
      description,
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
    const { code, description } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      code,

      description,
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
