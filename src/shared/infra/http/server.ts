import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { resolve } from 'path';

import GlobalError from '@shared/errors/GlobalError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use((req, res, next) => {
  next();
}, cors());
app.use(express.json());
app.use('/file', express.static(resolve(__dirname, '..', 'tmp')));
app.use(routes);
app.use(GlobalError);

app.listen(3333, () => {
  console.log('Servidor Iniciado na porta :3333');
});
