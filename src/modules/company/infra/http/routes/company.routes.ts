import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import CompanyController from '../controllers/CompanyController';

const companyRouter = Router();
const companyController = new CompanyController();

companyRouter.use(ensureAuthenticated, ensureAdmin);

companyRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required().min(4).max(4),
      cnpj: Joi.string().required().min(14).max(18),
      razao_social: Joi.string().required(),
      nome_fantasia: Joi.string().required(),
      email: Joi.string().required().email(),
      tel: Joi.string().allow(''),
      endereco: Joi.string().allow(''),
      cep: Joi.string().allow(''),
      uf: Joi.string().allow(''),
      info: Joi.string().allow(''),
      matriz_id: Joi.string().allow(''),
    },
  }),
  companyController.create,
);

companyRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      code: Joi.string().required().min(4).max(4),
      cnpj: Joi.string().required().min(14).max(18),
      razao_social: Joi.string().required(),
      nome_fantasia: Joi.string(),
      email: Joi.string().email(),
      tel: Joi.string().allow(''),
      endereco: Joi.string().allow(''),
      cep: Joi.string().allow(''),
      uf: Joi.string().allow(''),
      info: Joi.string().allow(''),
      matriz_id: Joi.string().allow(''),
    },
  }),
  companyController.update,
);

companyRouter.get('/', companyController.index);

companyRouter.get('/:id', companyController.show);

companyRouter.delete('/:id', companyController.delete);

export default companyRouter;
