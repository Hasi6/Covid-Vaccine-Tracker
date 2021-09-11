/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-17 20:24:53
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-17 20:27:46
 */
import * as jwt from 'jsonwebtoken';
export interface IJwtPayload {
  NIC: string;
  id: string;
}

export class JwtService {
  static generateToken(payload: IJwtPayload) {
    return jwt.sign(payload, 'JWT');
  }

  static verifyToken(token: string) {
    return jwt.verify(token, 'JWT');
  }
}
