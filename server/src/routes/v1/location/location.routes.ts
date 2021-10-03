import { Router } from 'express';
import { LocationController } from '../../../controllers/location/location.controller';

const locationRouter = Router();

locationRouter.get('/', LocationController.getAllLocations);
locationRouter.post('/', LocationController.addLocation);

export default locationRouter;
