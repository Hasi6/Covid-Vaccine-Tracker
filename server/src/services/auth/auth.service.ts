import { UnauthorizedError } from './../../shared/execptions';
import { JwtService } from './../jwt/jwt.service';
import { prismaUser } from './../../data';
import { ILoginBody } from './../../models/auth';
export class AuthService {
  public static async loginOrRegister(body: ILoginBody) {
    const { NIC, password } = body;
    const user = await this.findUserFromNIC(NIC);
    if (!user) {
      return await this.registerUser(body);
    }
    const isMatched = await JwtService.compirePasswords(password, user.password);

    if (!isMatched) {
      throw new UnauthorizedError('Invalid Credentials');
    }
    const { id, role } = user;
    return await JwtService.generateToken({ NIC, id, role });
  }

  public static async registerUser(body: ILoginBody) {
    try {
      const newUser = await prismaUser.create({ data: body });

      const { id, NIC } = newUser;
      return await JwtService.generateToken({ id, NIC, role: 'NORMAL' });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public static async findUserFromNIC(NIC: string) {
    try {
      return await prismaUser.findUnique({
        where: { NIC },
        select: { role: true, password: true, id: true },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
