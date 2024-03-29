import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import 'express-async-errors';

import '@shared/infra/typeorm';
import uploadConfig from '../../../config/upload';

import routes from './routes';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/api/v1/files', express.static(uploadConfig.tmpFolder));

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
