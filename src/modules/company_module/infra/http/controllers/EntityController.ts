import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/company_module/services/CreateEntityService';
import ListEntityService from '@modules/company_module/services/ListEntityService';
import ShowEntityService from '@modules/company_module/services/ShowEntityService';
import DeleteEntityService from '@modules/company_module/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { company, module } = req.body;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      company_id: company,
      module_id: module,
    });

    return res.json(entity);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { company_id, module_id } = req.query;
    const listEntity = container.resolve(ListEntityService);

    const result = await listEntity.execute({
      company: company_id as string,
      module: module_id as string,
    });

    return res.json(classToClass(result));
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
