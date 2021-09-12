import { AuthBodyValidator } from './../../../middlewares/body-validators/auth/auth.validator';
import { Router } from 'express';
import { AuthController } from '../../../controllers/auth/auth.controller';

const authRouter = Router();

authRouter.get('/login', AuthBodyValidator.loginUser, AuthController.login);

export default authRouter;
