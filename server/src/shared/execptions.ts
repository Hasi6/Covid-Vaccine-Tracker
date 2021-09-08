/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-16 14:45:08
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-17 20:52:15
 */

import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import { CustomSuccessResponse } from './success-response';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(message: string, public errors: ValidationError[]) {
    super(message);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors() {
    return this.errors.map((err) => ({
      message: <string>err.msg,
      field: <string>err.param,
    }));
  }
}

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';
  statusCode = 500;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Route Not Found';
  constructor(message?: string) {
    super(message || '');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

export class SuccessResponse extends CustomSuccessResponse {
  statusCode = 200;
  reason = 'Success';
  data = {};
  constructor(statusCode: number, data: object) {
    super('success', statusCode);
    this.data = data;

    Object.setPrototypeOf(this, SuccessResponse.prototype);
  }

  public serializeResponse() {
    return {
      message: this.reason,
      data: this.data,
    };
  }
}
