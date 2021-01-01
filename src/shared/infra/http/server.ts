import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import GlobalError from '@shared/errors/GlobalError';
import uploads from '@config/upload';
import rateLimiter from '@shared/infra/http/Middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use((req, res, next) => {
  next();
}, cors());
app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploads.uploadsFolder));
app.use(routes);
app.use(errors());
app.use(GlobalError);

app.listen(3333, () => {
  console.log('Servidor Iniciado na porta :3333');
});
