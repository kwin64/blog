import $api from '../utils/axios';

export default class AuthService {
  static async login(params) {
    return $api.post('/auth/login', params);
  }
  static async registration(email, password, nickname) {
    return $api.post('/auth/register', { email, password, nickname });
  }
  static async logout() {
    return $api.post('/logout');
  }
}
