import { Request, Response, Router } from 'express';
import { SuccessResponse } from '../../../shared/execptions';

const adminRouter = Router();

adminRouter.get('/healthCheck', (_req: Request, _res: Response) => {
  throw new SuccessResponse(201, {});
});

export default adminRouter;
