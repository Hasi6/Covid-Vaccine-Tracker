import { Router } from 'express';
import { VaccineController } from '../../../controllers/vaccine/vaccine.controller';

const vaccineRouter = Router();

vaccineRouter.get('/', VaccineController.getAllVaccines);

export default vaccineRouter;
