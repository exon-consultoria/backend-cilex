import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/pet_vaccine/services/CreateEntityService';
import ListEntityService from '@modules/pet_vaccine/services/ListEntityService';
import ShowEntityService from '@modules/pet_vaccine/services/ShowEntityService';
import DeleteEntityService from '@modules/pet_vaccine/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { pet_id, vaccine_id } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      pet_id,
      vaccine_id,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { pet, vaccine } = req.query;
    const listEntity = container.resolve(ListEntityService);

    const list = await listEntity.execute({
      pet_id: pet as string,
      vaccine_id: vaccine as string,
    });

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

    const result = await deleteService.execute(id as string);

    return res.json(classToClass(result));
  }
}
