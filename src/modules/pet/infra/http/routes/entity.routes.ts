import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

const uploadAvatar = multer(uploadConfig.multer);

entityRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      breed: Joi.string().allow(''),
      born_at: Joi.string().allow(''),
      gender: Joi.string().allow(''),
      sociable: Joi.boolean().allow(''),
      castrated: Joi.boolean().allow(''),
      enclosure_id: Joi.string().allow(''),
      owner_id: Joi.string().required(),
      items: Joi.string().allow(''),
      note: Joi.string().allow(''),
      vaccines: Joi.array(),
      size: Joi.string().required().max(1),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      breed: Joi.string().allow(''),
      born_at: Joi.string().allow(''),
      gender: Joi.string().allow(''),
      sociable: Joi.boolean().allow(''),
      castrated: Joi.boolean().allow(''),
      enclosure_id: Joi.string().allow(''),
      owner_id: Joi.string().required(),
      items: Joi.string().allow(''),
      note: Joi.string().allow(''),
      vaccines: Joi.array(),
      size: Joi.string().required().max(1),
    },
  }),
  entityController.update,
);

entityRouter.patch(
  '/:id',
  uploadAvatar.single('picture'),
  entityController.patch,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
