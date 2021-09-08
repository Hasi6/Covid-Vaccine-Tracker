/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-16 16:04:38
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-16 20:35:44
 */

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string; data?: object }[];
}
