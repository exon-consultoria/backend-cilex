import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.string().required(),
      recurrence: Joi.string().allow(''),
      work_id: Joi.string().required(),
      pet_id: Joi.string().required(),
      done: Joi.boolean(),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      date: Joi.string().allow(''),
      recurrence: Joi.string().allow(''),
      work_id: Joi.string().allow(),
      pet_id: Joi.string().allow(),
      done: Joi.boolean(),
    },
  }),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
