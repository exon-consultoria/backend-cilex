import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/segment_module/services/CreateEntityService';
import ListEntityService from '@modules/segment_module/services/ListEntityService';
import ShowEntityService from '@modules/segment_module/services/ShowEntityService';
import DeleteEntityService from '@modules/segment_module/services/DeleteEntityService';
import ListSegmentsModulesService from '@modules/segment_module/services/ListSegmentsModulesService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { segment, module } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      segment,
      module,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { segment, module } = req.query;
    const listEntity = container.resolve(ListEntityService);

    const list = await listEntity.execute({
      segment_id: segment as string,
      module_id: module as string,
    });

    return res.json(classToClass(list));
  }

  public async indexFormatted(req: Request, res: Response): Promise<Response> {
    const { segment } = req.query;
    const listEntity = container.resolve(ListSegmentsModulesService);

    const list = await listEntity.execute({
      segment_id: segment as string,
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
