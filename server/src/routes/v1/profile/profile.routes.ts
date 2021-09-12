import { Request, Response, Router } from 'express';
import { SuccessResponse } from '../../../shared/execptions';

const profileRouter: Router = Router();

profileRouter.get('/', (_req: Request, _res: Response) => {
  console.log('Health check');
  throw new SuccessResponse(200, {});
});

export default profileRouter;