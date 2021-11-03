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
      application_id: Joi.string().allow(''),
      dimensions_id: Joi.string().allow(''),
      family_id: Joi.string().allow(''),
      group_id: Joi.string().allow(''),
      subfamily_id: Joi.string().allow(''),
      subgroup_id: Joi.string().allow(''),
      picture: Joi.string().allow(''),
      technical_picture: Joi.string().allow(''),
      technical_description: Joi.string().allow(''),
      type_id: Joi.string().allow(''),
      umc_id: Joi.string().allow(''),
      umu_id: Joi.string().allow(''),
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
      application_id: Joi.string().allow(''),
      dimensions_id: Joi.string().allow(''),
      family_id: Joi.string().allow(''),
      group_id: Joi.string().allow(''),
      subfamily_id: Joi.string().allow(''),
      subgroup_id: Joi.string().allow(''),
      picture: Joi.string().allow(''),
      technical_picture: Joi.string().allow(''),
      technical_description: Joi.string().allow(''),
      type_id: Joi.string().allow(''),
      umc_id: Joi.string().allow(''),
      umu_id: Joi.string().allow(''),
    },
  }),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
