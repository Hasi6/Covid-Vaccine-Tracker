import { Request, Response } from 'express';
import { DistrictService } from '../../services/districts/districts.service';
import { AuthenticationHandler } from '../../shared/decorators/authentication.handler';
import { SuccessResponse } from '../../shared/execptions';

export class DistrictController {
  @AuthenticationHandler()
  public static async getAllDistrics(_req: Request, _res: Response) {
    const data = await DistrictService.getAllDistricts();
    throw new SuccessResponse(201, data);
  }
}
