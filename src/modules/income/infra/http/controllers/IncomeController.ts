import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateIncomeService from '@modules/income/services/CreateIncomeService';
import ShowIncomeService from '@modules/income/services/ShowIncomeService';
import ListIncomeService from '@modules/income/services/ListIncomeService';
import UpdateIncomeService from '@modules/income/services/UpdateIncomeService';
import DeleteIncomeService from '@modules/income/services/DeleteIncomeService';

export default class IncomeController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { code, account, type } = req.body;

    const createIncome = container.resolve(CreateIncomeService);

    const company = await createIncome.execute({
      code,
      account,
      type,
    });

    return res.json(company);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showIncome = container.resolve(ShowIncomeService);

    const result = await showIncome.execute(id);

    return res.json(classToClass(result));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const allIncomes = container.resolve(ListIncomeService);

    const list = await allIncomes.execute();

    return res.json(classToClass(list));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      date_income,
      type,
      financial_entity,
      chart_of_accounts,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
    } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateIncomeService);

    const income = await update.execute({
      id,
      date_income,
      type,
      financial_entity,
      chart_of_accounts,
      description,
      value,
      date_to_pay,
      value_payed,
      date_payed,
      title_status,
      payed_status,
      cash_flow,
    });

    return res.json(income);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteIncome = container.resolve(DeleteIncomeService);

    const result = await deleteIncome.execute(id as string);

    return res.json(classToClass(result));
  }
}
