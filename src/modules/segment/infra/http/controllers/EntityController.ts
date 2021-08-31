import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/segment/services/CreateEntityService';
import ListEntityService from '@modules/segment/services/ListEntityService';
import ShowEntityService from '@modules/segment/services/ShowEntityService';
import DeleteEntityService from '@modules/segment/services/DeleteEntityService';
import UpdateEntityService from '@modules/segment/services/UpdateEntityService';
import ListSegmentModule from '@modules/segment/services/ListSegmentModule';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, classIcon, description, isLocked } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      name,
      classIcon,
      description,
      isLocked,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listEntity = container.resolve(ListEntityService);

    const list = await listEntity.execute();

    return res.json(classToClass(list));
  }

  public async indexFormatted(req: Request, res: Response): Promise<Response> {
    const listEntity = container.resolve(ListSegmentModule);

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
    const { name, classIcon, description, isLocked } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      name,
      classIcon,
      description,
      isLocked,
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
