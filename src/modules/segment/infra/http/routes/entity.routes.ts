import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      classIcon: Joi.string(),
      description: Joi.string(),
      isLocked: Joi.boolean(),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      classIcon: Joi.string(),
      description: Joi.string(),
      isLocked: Joi.boolean(),
    },
  }),
  entityController.update,
);

entityRouter.get('/segmentsModule', entityController.indexFormatted);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
