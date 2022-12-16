import $api from '../utils/axios';

export default class PostsService {
  static async posts() {
    return $api.get('/posts');
  }
  static async post(id) {
    return $api.get(`/posts/${id}`);
  }
}
