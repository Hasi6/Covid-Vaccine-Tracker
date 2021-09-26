import { StorageService } from './../storage/storage.service';
import http from '../http/http.service';

export class AuthService {
  public static async login(body: object) {
    try {
      const res = await http.post('/auth/login', body);
      await StorageService.saveItem('ACCESS_TOKEN', res.data?.data?.accessToken);
      return res;
    } catch (err) {
      throw err;
    }
  }

  public static async whoIAMI() {
    try {
      const res = await http.get('/auth/whoAmI');
      return res;
    } catch (err) {
      throw err;
    }
  }

  public static async getCurrentUserToken() {
    return await StorageService.getItem('ACCESS_TOKEN');
  }
}
