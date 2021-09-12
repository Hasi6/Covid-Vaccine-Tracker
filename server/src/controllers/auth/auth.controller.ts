import { AuthService } from './../../services/auth/auth.service';
import { Request, Response } from 'express';
import { BodyValidator } from '../../shared/decorators/body.validator';
import { SuccessResponse } from '../../shared/execptions';
import { ILoginBody } from './../../models/auth';
import { AuthenticationHandler } from '../../shared/decorators/authentication.handler';

export class AuthController {
  @BodyValidator()
  public static async login(_req: Request, _res: Response) {
    const body: ILoginBody = _req.body;
    const tokens = await AuthService.loginOrRegister(body);
    throw new SuccessResponse(200, tokens);
  }

  @AuthenticationHandler()
  public static async whoAmI(_req: Request, _res: Response) {
    console.log(_req.user);
    throw new SuccessResponse(200, { user: _req.user });
  }
}
