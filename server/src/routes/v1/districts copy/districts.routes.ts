import { DistrictService } from './../../../services/districts/districts.service';
import { Request, Response, Router } from 'express';
import { SuccessResponse } from '../../../shared/execptions';
import { DistrictController } from '../../../controllers/districts/district.controller';

const districtsRouter = Router();

districtsRouter.get('/', DistrictController.getAllDistrics);

export default districtsRouter;
