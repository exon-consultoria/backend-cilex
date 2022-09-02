import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import EntryController from '../controllers/EntryController';

const entryRouter = Router();
const entryController = new EntryController();

entryRouter.use(ensureAuthenticated, ensureAdmin);

entryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date_income: Joi.string().required(),
      type: Joi.string().required(),
      financial_entity: Joi.string().required(),
      chart_of_accounts: Joi.string().required(),
      description: Joi.string().required().email(),
      value: Joi.number().required(),
      date_to_pay: Joi.string().required(),
      value_payed: Joi.number().required(),
      date_payed: Joi.string().allow(''),
      title_status: Joi.string().allow(''),
      payed_status: Joi.string().allow(''),
      cash_flow: Joi.number(),
      income_id: Joi.string(),
    },
  }),
  entryController.create,
);

entryRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      date_income: Joi.string().allow(''),
      type: Joi.string().allow(''),
      financial_entity: Joi.string().allow(''),
      chart_of_accounts: Joi.string().allow(''),
      description: Joi.string().email(),
      value: Joi.number(),
      date_to_pay: Joi.string().allow(''),
      value_payed: Joi.number().allow(''),
      date_payed: Joi.string().allow(''),
      title_status: Joi.string().allow(''),
      payed_status: Joi.string().allow(''),
      cash_flow: Joi.number(),
    },
  }),
  entryController.update,
);

entryRouter.get('/', entryController.index);
entryRouter.get('/:id', entryController.show);

entryRouter.delete('/:id', entryController.delete);

export default entryRouter;
