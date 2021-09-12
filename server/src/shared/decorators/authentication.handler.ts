/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-06-05 20:58:38
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-06-05 21:10:32
 */

import { JsonWebTokenError } from 'jsonwebtoken';
import { JwtService } from '../../services/jwt/jwt.service';
import { UnauthorizedError } from '../execptions';

function authenticationHandler(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (_target: object, _functionName: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        const [_, token] = args[0]?.headers?.authorization?.split(' ');
        if (!token) {
          throw new UnauthorizedError('Unauthorized');
        }

        const user = await JwtService.verifyToken(token);
        if (!user) {
          throw new UnauthorizedError('Unauthorized');
        }

        args[0].user = user;

        // Execute the actual method wrapped in the audit decorator and get the output
        const output: object = await originalMethod.apply(this, args);
        return output;
      } catch (error) {
        if (error instanceof JsonWebTokenError) {
          throw new UnauthorizedError('Unauthorized');
        }
        throw error;
      }
    };

    return descriptor;
  };
}
export { authenticationHandler as AuthenticationHandler };
