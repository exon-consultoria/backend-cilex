import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateEntityService from '@modules/product/services/CreateEntityService';
import ListEntityService from '@modules/product/services/ListEntityService';
import ShowEntityService from '@modules/product/services/ShowEntityService';
import UpdateEntityService from '@modules/product/services/UpdateEntityService';
import DeleteEntityService from '@modules/product/services/DeleteEntityService';

export default class EntityController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      code,
      description,
      application_id,
      dimensions_id,
      family_id,
      group_id,
      subfamily_id,
      subgroup_id,
      technical_description,
      type_id,
      umc_id,
      umu_id,
    } = req.body;

    const picture = req.files.picture[0].filename;
    const technical_picture = req.files.technical_picture[0].filename;

    const createEntity = container.resolve(CreateEntityService);

    const entity = await createEntity.execute({
      code,
      description,
      application_id,
      dimensions_id,
      family_id,
      group_id,
      subfamily_id,
      subgroup_id,
      picture,
      technical_picture,
      technical_description,
      type_id,
      umc_id,
      umu_id,
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
      code,
      description,
      application_id,
      dimensions_id,
      family_id,
      group_id,
      subfamily_id,
      subgroup_id,
      technical_description,
      type_id,
      umc_id,
      umu_id,
    } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const picture = req.files.picture[0].filename;
    const technical_picture = req.files.technical_picture[0].filename;

    const entity = await update.execute({
      id: id as string,
      code,
      description,
      application_id,
      dimensions_id,
      family_id,
      group_id,
      subfamily_id,
      subgroup_id,
      picture,
      technical_picture,
      technical_description,
      type_id,
      umc_id,
      umu_id,
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
