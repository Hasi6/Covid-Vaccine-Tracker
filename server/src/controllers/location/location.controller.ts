import { LocationService } from './../../services/location/location.service';
import { Request, Response } from 'express';
import {
  AdminAuthHandler,
  AuthenticationHandler,
} from '../../shared/decorators/authentication.handler';
import { SuccessResponse } from '../../shared/execptions';

export class LocationController {
  @AuthenticationHandler()
  public static async getAllLocations(_req: Request, _res: Response) {
    const data = await LocationService.getAllLocations();
    throw new SuccessResponse(201, data);
  }

  @AdminAuthHandler()
  public static async addLocation(_req: Request, _res: Response) {
    console.log(_req.body);
    const data = await LocationService.addLocation(_req.body);
    throw new SuccessResponse(201, data);
  }
}
