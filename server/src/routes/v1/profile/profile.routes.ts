import { Router } from 'express';
import { ProfileController } from '../../../controllers/profile/profile.controller';

const profileRouter: Router = Router();

profileRouter.get('/', ProfileController.addProfile);
profileRouter.post('/', ProfileController.addProfile);

export default profileRouter;
