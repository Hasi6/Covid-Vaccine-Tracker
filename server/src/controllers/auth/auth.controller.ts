import { AuthService } from './../../services/auth/auth.service';
import { Request, Response } from 'express';
import { BodyValidator } from '../../shared/decorators/body.validator';
import { SuccessResponse } from '../../shared/execptions';
import { ILoginBody } from './../../models/auth';

export class AuthController {
  @BodyValidator()
  public static async login(_req: Request, _res: Response) {
    const body: ILoginBody = _req.body;
    return await AuthService.loginOrRegister(body);
  }

  public static async success(_req: Request, _res: Response) {
    throw new SuccessResponse(200, { isSuccess: true });
  }
}
