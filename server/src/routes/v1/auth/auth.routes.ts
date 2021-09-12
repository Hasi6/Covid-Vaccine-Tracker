import { AuthBodyValidator } from './../../../middlewares/body-validators/auth/auth.validator';
import { Router } from 'express';
import { AuthController } from '../../../controllers/auth/auth.controller';

const authRouter = Router();

authRouter.get('/whoAmI', AuthController.whoAmI);
authRouter.post('/login', AuthBodyValidator.loginUser(), AuthController.login);

export default authRouter;
