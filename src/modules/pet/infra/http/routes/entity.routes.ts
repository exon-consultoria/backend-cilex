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
      breed: Joi.string(),
      born_at: Joi.string(),
      gender: Joi.string(),
      sociable: Joi.boolean(),
      castrated: Joi.boolean(),
      enclosure_id: Joi.string(),
      owner_id: Joi.string().required(),
      items: Joi.string(),
      note: Joi.string(),
      vaccines: Joi.array(),
    },
  }),
  entityController.create,
);

entityRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      breed: Joi.string(),
      born_at: Joi.string(),
      gender: Joi.string(),
      sociable: Joi.boolean(),
      castrated: Joi.boolean(),
      enclosure_id: Joi.string(),
      owner_id: Joi.string().required(),
      items: Joi.string(),
      note: Joi.string(),
      vaccines: Joi.array(),
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
