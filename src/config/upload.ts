import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IStorageConfig {
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  // upload(folder: string) {
  //   return {
  //     storage: multer.diskStorage({
  //       destination: resolve(__dirname, '..', '..', folder),
  //       filename: (request, file, callback) => {
  //         const fileHash = crypto.randomBytes(10).toString('hex');
  //         const fileName = `${fileHash}-${file.originalname}`;

  //         return callback(null, fileName);
  //       },
  //     }),
  //   };
  // },
} as IStorageConfig;
