import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/hasi', (_req: Request, _res: Response) => {
  console.log('hasi');
  return _res.json({ name: 'Hello World' });
});

app.listen(7001, () => {
  console.log('Api Server Started');
});
