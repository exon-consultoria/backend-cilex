import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import IncomeController from '../controllers/IncomeController';

const incomeRouter = Router();
const incomeController = new IncomeController();

incomeRouter.use(ensureAuthenticated, ensureAdmin);

incomeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required(),
      account: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  incomeController.create,
);

incomeRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string(),
      account: Joi.string(),
      type: Joi.string(),
    },
  }),
  incomeController.update,
);

incomeRouter.get('/', incomeController.index);
incomeRouter.get('/:id', incomeController.show);

incomeRouter.delete('/:id', incomeController.delete);

export default incomeRouter;
