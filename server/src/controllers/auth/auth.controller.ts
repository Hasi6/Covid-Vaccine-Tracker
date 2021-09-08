import { Request, Response } from 'express';
import { BadRequestError, SuccessResponse } from '../../shared/execptions';

export class AuthController {
  public static async badRequest(_req: Request, _res: Response) {
    throw new BadRequestError('Bad Request');
  }

  public static async success(_req: Request, _res: Response) {
    throw new SuccessResponse(200, { isSuccess: true });
  }
}
