import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(4).max(25),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      group_id: Joi.string().allow(''),
    },
  }),
  usersController.create,
);

usersRouter.post(
  '/pending',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(4).max(25),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      pendingUser_id: Joi.string().required(),
      group_id: Joi.string(),
    },
  }),
  usersController.createPendingUser,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(4).max(25),
      email: Joi.string().email(),
      password: Joi.string(),
      isAdmin: Joi.boolean(),
      isActive: Joi.boolean(),
      group_id: Joi.string().allow(''),
    },
  }),
  usersController.update,
);

usersRouter.get('/:id', usersController.show);
usersRouter.get('/', usersController.index);

export default usersRouter;
