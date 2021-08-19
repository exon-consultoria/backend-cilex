import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import CreateUserPendingService from '@modules/user/services/CreateUserPendingService';
import UpdateEntityService from '@modules/user/services/UpdateEntityService';
import ShowEntityService from '@modules/user/services/ShowEntityService';

export default class UsersController {
  public async createPendingUser(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const {
      name,
      email,
      password,
      isAdmin,
      pendingUser_id,
      group_id,
    } = req.body;

    const createUser = container.resolve(CreateUserPendingService);

    const user = await createUser.execute({
      name,
      email,
      password,
      isAdmin,
      pendingUser_id,
      group_id,
    });

    return res.json(classToClass(user));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin, group_id } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      isAdmin,
      group_id,
    });

    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUsersService);

    const users = await listUser.execute();

    return res.json(classToClass(users));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin, isActive, group_id } = req.body;

    const { id } = req.params;

    const update = container.resolve(UpdateEntityService);

    const entity = await update.execute({
      id: id as string,
      name,
      email,
      password,
      isAdmin,
      isActive,
      group_id,
    });

    return res.json(entity);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showService = container.resolve(ShowEntityService);

    const result = await showService.execute(id);

    return res.json(classToClass(result));
  }
}
