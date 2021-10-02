import { Request, Response } from 'express';
import { VaccineService } from '../../services/vaccine/vaccine.service';
import { AuthenticationHandler } from '../../shared/decorators/authentication.handler';
import { SuccessResponse } from '../../shared/execptions';

export class VaccineController {
  public static async getAllVaccines(_req: Request, _res: Response) {
    const data = await VaccineService.getAllVaccines();
    throw new SuccessResponse(201, data);
  }
}
