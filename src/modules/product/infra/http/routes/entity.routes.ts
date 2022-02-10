import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import EntityController from '../controllers/EntityController';

const entityRouter = Router();
const entityController = new EntityController();

const uploadAvatar = multer(uploadConfig.multer);

entityRouter.post(
  '/calculateInventory',
  celebrate({
    [Segments.BODY]: {
      storage_id: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  entityController.calculateInventory,
);

entityRouter.post(
  '/',
  uploadAvatar.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'technical_picture', maxCount: 1 },
  ]),
  entityController.create,
);

entityRouter.put(
  '/:id',
  uploadAvatar.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'technical_picture', maxCount: 1 },
  ]),
  entityController.update,
);

entityRouter.get('/', entityController.index);

entityRouter.get('/:id', entityController.show);

entityRouter.delete('/:id', entityController.delete);

export default entityRouter;
