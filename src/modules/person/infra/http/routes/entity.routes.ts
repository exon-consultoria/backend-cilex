import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().min(14).max(18),
      razao_social: Joi.string(),
      nome_fantasia: Joi.string(),
      email: Joi.string().email().allow(''),
      tel: Joi.string().allow(''),
      endereco: Joi.string().allow(''),
      cep: Joi.string().allow(''),
      uf: Joi.string().allow(''),
      info: Joi.string().allow(''),
      code: Joi.string().required().min(4).max(6),
      cpf: Joi.string().min(11).max(11).allow(''),
      nome: Joi.string(),
      isUser: Joi.boolean().default(false),
      tipo: Joi.string().allow(''),
      role_id: Joi.string(),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().min(14).max(18),
      razao_social: Joi.string(),
      nome_fantasia: Joi.string(),
      email: Joi.string().email(),
      tel: Joi.string().allow(''),
      endereco: Joi.string().allow(''),
      cep: Joi.string().allow(''),
      uf: Joi.string().allow(''),
      info: Joi.string().allow(''),
      code: Joi.string().min(4).max(6),
      cpf: Joi.string().min(11).max(11),
      nome: Joi.string(),
      isUser: Joi.boolean().default(false),
      tipo: Joi.string().allow(''),
      role_id: Joi.string(),
    },
  }),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
