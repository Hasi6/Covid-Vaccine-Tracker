import { Request, Response } from 'express';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthenticationHandler } from '../../shared/decorators/authentication.handler';
import { SuccessResponse } from '../../shared/execptions';

export class ProfileController {
  @AuthenticationHandler()
  public static async addProfile(_req: Request, _res: Response) {
    // @ts-ignore
    const data = await ProfileService.addProfile({ ..._req.body, userId: _req.user?.id });
    throw new SuccessResponse(201, data);
  }

  @AuthenticationHandler()
  public static async getProfile(_req: Request, _res: Response) {
    // @ts-ignore
    const data = await ProfileService.getProfile(_req.user?.id);
    throw new SuccessResponse(201, { data });
  }
}
