import $api from '../utils/axios';

export default class PostsService {
  static async posts() {
    return $api.get('/posts');
  }
}
