/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-16 16:04:38
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-16 20:35:44
 */

export abstract class CustomSuccessResponse extends Error {
  abstract statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, CustomSuccessResponse.prototype);
  }

  abstract serializeResponse(): { message: string; data?: object };
}
