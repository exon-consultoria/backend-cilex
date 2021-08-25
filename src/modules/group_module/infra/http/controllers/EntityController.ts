import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/group_module/services/CreateEntityService';
import ListEntityService from '@modules/group_module/services/ListEntityService';
import ShowEntityService from '@modules/group_module/services/ShowEntityService';
import DeleteEntityService from '@modules/group_module/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { group_id, module_id } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      group_id,
      module_id,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { group, module } = req.query;
    const listEntity = container.resolve(ListEntityService);

    console.log(group, module);

    const list = await listEntity.execute({
      group_id: group as string,
      module_id: module as string,
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
