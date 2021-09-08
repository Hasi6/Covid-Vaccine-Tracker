/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-16 12:02:37
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-17 22:46:15
 */
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../shared/custom-error';
import { CustomSuccessResponse } from '../shared/success-response';

export const errorHandler = (_err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  if (_err instanceof CustomError) {
    return _res.status(_err.statusCode).json({ errors: _err.serializeErrors(), success: false, data: null });
  }

  if (_err instanceof CustomSuccessResponse) {
    return _res.status(_err.statusCode).json({ ..._err.serializeResponse(), success: true, errors: [] });
  }
  console.log(_err);
  return _res.status(500).json({
    errors: [
      {
        message: 'Something went Wrong',
        field: '',
      },
    ],
  });
};
