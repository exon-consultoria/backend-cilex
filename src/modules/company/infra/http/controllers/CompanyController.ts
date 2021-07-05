import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateCompanyService from '@modules/company/services/CreateCompanyService';
import ListCompanyService from '@modules/company/services/ListCompanyService';
import ShowCompanyService from '@modules/company/services/ShowCompanyService';
import UpdateCompanyService from '@modules/company/services/UpdateCompanyService';
import DeleteCompanyService from '@modules/company/services/DeleteCompanyService';

export default class CompanyController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      cod,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      matriz_id,
    } = req.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      cod,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      matriz_id,
    });

    return res.json(company);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listService = container.resolve(ListCompanyService);

    const list = await listService.execute();

    return res.json(classToClass(list));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showService = container.resolve(ShowCompanyService);

    const result = await showService.execute(id);

    return res.json(classToClass(result));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      cod,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      matriz_id,
    } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateCompanyService);

    const company = await update.execute({
      company_id: id as string,
      cod,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      matriz_id,
    });

    return res.json(company);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteService = container.resolve(DeleteCompanyService);

    const result = await deleteService.execute(id as string);

    return res.json(classToClass(result));
  }
}
