import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/pet/services/CreateEntityService';
import ListEntityService from '@modules/pet/services/ListEntityService';
import ShowEntityService from '@modules/pet/services/ShowEntityService';
import UpdateEntityService from '@modules/pet/services/UpdateEntityService';
import DeleteEntityService from '@modules/pet/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      localization,
      vaccines,
      owner_id,
      note,
    } = req.body;

    try {
      const picture = req.files.picture[0].filename;
    } catch (e) {}

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      name,
      picture,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      localization,
      vaccines,
      owner_id,
      note,
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
      name,
      picture,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      localization,
      vaccines,
      owner_id,
      note,
    } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    try {
      const picture = req.files.picture[0].filename;
    } catch (e) {}

    const entity = await update.execute({
      id: id as string,
      name,
      picture,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      localization,
      vaccines,
      owner_id,
      note,
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
