import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/transaction/services/CreateEntityService';
import ListEntityService from '@modules/transaction/services/ListEntityService';
import ShowEntityService from '@modules/transaction/services/ShowEntityService';
import UpdateEntityService from '@modules/transaction/services/UpdateEntityService';
import DeleteEntityService from '@modules/transaction/services/DeleteEntityService';
import FindByStorageService from '@modules/transaction/services/FindByStorageService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { product_id, origin_id, destination_id, quantity, type } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      product_id,
      origin_id,
      destination_id,
      quantity,
      type,
      user_id: req.user.id,
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

  public async findByStorage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findByStorageService = container.resolve(FindByStorageService);

    const result = await findByStorageService.execute(id);

    return res.json(classToClass(result));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { product_id, origin_id, destination_id, quantity, type } = req.body;

    const { id } = req.params;

    const updateService = container.resolve(UpdateEntityService);

    const entity = await updateService.execute({
      id: id as string,
      product_id,
      origin_id,
      destination_id,
      quantity,
      type,
      user_id: req.user.id,
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
