/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-04-17 20:24:53
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-04-17 20:27:46
 */
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
export interface IJwtPayload {
  NIC: string;
  id: number;

  role: string;
}

export class JwtService {
  public static generateToken(payload: IJwtPayload) {
    return jwt.sign(payload, 'JWT');
  }

  public static verifyToken(token: string) {
    return jwt.verify(token, 'JWT');
  }

  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public static async compirePasswords(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
