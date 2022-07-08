import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/appointment/services/CreateEntityService';
import CreateManyEntityService from '@modules/appointment/services/CreateManyEntityService';
import ListEntityService from '@modules/appointment/services/ListEntityService';
import ShowEntityService from '@modules/appointment/services/ShowEntityService';
import UpdateEntityService from '@modules/appointment/services/UpdateEntityService';
import DeleteEntityService from '@modules/appointment/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { date, hour, pet_id, work_id, recurrence, done } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      date,
      hour,
      pet_id,
      work_id,
      recurrence,
      done,
    });

    return res.json(entity);
  }

  public async createMany(req: Request, res: Response): Promise<Response> {
    const appointments = req.body;

    const createManyEntity = container.resolve(CreateManyEntityService);

    const entity = await createManyEntity.execute(appointments);

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { date } = req.query;

    const listEntity = container.resolve(ListEntityService);

    const list = await listEntity.execute(date as string);

    return res.json(classToClass(list));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showService = container.resolve(ShowEntityService);

    const result = await showService.execute(id);

    return res.json(classToClass(result));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { date, hour, pet_id, work_id, recurrence, done } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      date,
      hour,
      pet_id,
      work_id,
      recurrence,
      done,
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
