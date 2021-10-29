import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required().min(4).max(6),
      description: Joi.string().required(),
      product_group_id: Joi.string().required(),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required().min(4).max(6),
      description: Joi.string().required(),
      product_group_id: Joi.string(),
    },
  }),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
