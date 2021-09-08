/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-06-06 10:45:17
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-06-06 11:35:49
 */

import { body } from 'express-validator';

export class ProjectBodyValidator {
  static createProject() {
    return [
      body('name', "name is Require doesn't exists")
        .exists()
        .isString()
        .withMessage('name Should be string'),
    ];
  }
}
