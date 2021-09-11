export class AuthService {
  public static async registerUser() {
    try {
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public static async findUserFromNIC(NIC: string) {
    try {
      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
