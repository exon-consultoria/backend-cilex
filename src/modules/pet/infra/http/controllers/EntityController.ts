import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/pet/services/CreateEntityService';
import ListEntityService from '@modules/pet/services/ListEntityService';
import ShowEntityService from '@modules/pet/services/ShowEntityService';
import UpdateEntityService from '@modules/pet/services/UpdateEntityService';
import DeleteEntityService from '@modules/pet/services/DeleteEntityService';
import UpdatePictureEntityService from '@modules/pet/services/UpdatePictureEntityService';

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
      enclosure_id,
      owner_id,
      vaccines,
      note,
      size,
    } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      name,
      vaccines,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      enclosure_id,
      owner_id,
      note,
      size,
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
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      enclosure_id,
      vaccines,
      owner_id,
      note,
      size,
    } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      name,
      breed,
      born_at,
      gender,
      sociable,
      castrated,
      items,
      enclosure_id,
      vaccines,
      owner_id,
      note,
      size,
    });

    return res.json(entity);
  }

  public async patch(req: Request, res: Response): Promise<Response> {
    const picture = req.file.filename;

    const { id } = req.params;

    const update = container.resolve(UpdatePictureEntityService);

    const entity = await update.execute({
      id: id as string,
      picture,
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
