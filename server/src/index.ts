require('dotenv').config();
import express, { Express, json, Request, Response } from 'express';
import 'express-async-errors';
import logger from 'morgan';

import { errorHandler } from './middlewares/error-handler';
import apiGatewayRouter from './routes/v1/api_gateway/api.gateway';
import authRouter from './routes/v1/auth/auth.routes';
import { NotFoundError } from './shared/execptions';
import './types';

const app: Express = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', '*');
  next();
});
app.use(json());
app.use(logger('dev'));
app.use('/', apiGatewayRouter);
app.use('/', authRouter);

const PORT = process.env.PORT || 7000;

app.all('*', async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT}`);
});
