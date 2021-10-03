import { Router } from 'express';
import { ProfileController } from '../../../controllers/profile/profile.controller';

const profileRouter: Router = Router();

profileRouter.get('/', ProfileController.getProfile);
profileRouter.get('/:NIC', ProfileController.getProfileByNIC);
profileRouter.post('/', ProfileController.addProfile);
profileRouter.put('/:NIC', ProfileController.updateVaccinateDetails);

export default profileRouter;
