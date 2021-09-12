import { body } from 'express-validator';

export class AuthBodyValidator {
  static loginUser() {
    return [
      body('NIC', "NIC is Required doesn't exists")
        .exists()
        .isString()
        .withMessage('NIC Should be string'),
      body('password', "Password is Required doesn't exists")
        .exists()
        .isString()
        .withMessage('Password Should be string'),
    ];
  }
}
