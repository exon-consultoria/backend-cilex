import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.use(ensureAuthenticated);

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid(),
      origin_id: Joi.string().allow(''),
      destination_id: Joi.string().allow(''),
      quantity: Joi.string().required(),
      type: Joi.string().allow(''),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().allow(''),
      origin_id: Joi.string().allow(''),
      destination_id: Joi.string().allow(''),
      quantity: Joi.string().allow(''),
      type: Joi.string().allow(''),
    },
  }),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.get('/bystorage/:id', entityController.findByStorage);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
