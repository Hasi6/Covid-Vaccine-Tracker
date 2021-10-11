/*
 * @Author: Hasi6
 * @Email: hasitha.chandula@gmail.com
 * @Date: 2021-01-24 21:31:43
 * @Last Modified by: Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-06-12 09:43:07
 */
import axios from 'axios';
import { AuthService } from '../auth/auth.service';

const http = axios.create({
  baseURL: 'https://covid-tracker-hasi6.vercel.app/api/v1',
  timeout: 30000,
});

// const sessionCheck = () => {
// authServices.getCurrentAuthenticatedUser().catch((err: any) => {
//   console.error('getCurrentAuthenticatedUser', err);
//   window.location.reload();
// });
// };

http.interceptors.request.use((config) => {
  return AuthService.getCurrentUserToken()
    .then((idToken: string | null) => {
      config.headers.Authorization = `Bearer ${idToken}`;
      return Promise.resolve(config);
    })
    .catch((error: any) => {
      console.error('http request', error);
      return Promise.reject(error);
    });
});

http.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: { response: any }) => {
    return Promise.reject(error.response);
  }
);

export default http;
