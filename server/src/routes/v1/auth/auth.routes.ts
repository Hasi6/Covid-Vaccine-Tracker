import { Router } from 'express';
import { AuthController } from '../../../controllers/auth/auth.controller';

const authRouter = Router();

authRouter.get('/badRequest', AuthController.badRequest);
authRouter.get('/success', AuthController.success);

export default authRouter;
