import $api from '../utils/axios';

export default class AuthService {
  static async login(params) {
    return $api.post('/auth/login', params);
  }
  static async registration(params) {
    return $api.post('/auth/register', params);
  }
  static async authMe() {
    return $api.get('/auth/me');
  }
}
