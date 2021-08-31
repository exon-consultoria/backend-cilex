import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      module: Joi.string().uuid(),
      segment: Joi.string().uuid(),
    },
  }),
  entityController.create,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/segmentformatted', entityController.indexFormatted);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
