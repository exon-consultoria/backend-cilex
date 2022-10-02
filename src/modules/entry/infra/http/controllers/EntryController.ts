import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEntryService from '@modules/entry/services/CreateEntryService';
import ShowEntryService from '@modules/entry/services/ShowEntryService';
import ListEntryService from '@modules/entry/services/ListEntryService';
import UpdateEntryService from '@modules/entry/services/UpdateEntryService';
import DeleteEntryService from '@modules/entry/services/DeleteEntryService';

export default class EntryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      date_income,
      type,
      financial_entity,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
      income_id,
    } = req.body;

    const createEntry = container.resolve(CreateEntryService);

    const createdEntry = await createEntry.execute({
      date_income,
      type,
      financial_entity,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
      income_id,
    });

    return res.json(createdEntry);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showEntry = container.resolve(ShowEntryService);

    const entry = await showEntry.execute(id);

    return res.json(classToClass(entry));
  }

  public async index(_: Request, res: Response): Promise<Response> {
    const allEntries = container.resolve(ListEntryService);

    const list = await allEntries.execute();

    return res.json(classToClass(list));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      date_income,
      type,
      financial_entity,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
      income_id,
    } = req.body;

    const { id } = req.params;

    const updateEntry = container.resolve(UpdateEntryService);

    const updatedEntry = await updateEntry.execute({
      id,
      date_income,
      type,
      financial_entity,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
      income_id,
    });

    return res.json(updatedEntry);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteEntry = container.resolve(DeleteEntryService);

    const deletedEntry = await deleteEntry.execute(id as string);

    return res.json(classToClass(deletedEntry));
  }
}
