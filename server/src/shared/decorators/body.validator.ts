/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-06-05 20:58:38
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-06-06 11:28:26
 */

import { validationResult } from 'express-validator';
import { UnauthorizedError } from '../execptions';

function bodyValidator(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    _target: object,
    _functionName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        const errors = validationResult(args[0]);
        if (!errors.isEmpty()) {
          return args[1].status(422).json({ errors: errors.array() });
        }

        // Execute the actual method wrapped in the audit decorator and get the output
        const output: object = await originalMethod.apply(this, args);
        return output;
      } catch (error) {
        throw new UnauthorizedError('Unauthorized');
      }
    };

    return descriptor;
  };
}
export { bodyValidator as BodyValidator };
