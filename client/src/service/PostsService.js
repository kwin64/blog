import $api from '../utils/axios';

export default class PostsService {
  static async posts() {
    return $api.get('/posts');
  }
  static async post(id) {
    return $api.get(`/posts/${id}`);
  }
  static async uploadImageForNewPost(image) {
    return $api.post(`/upload`, image);
  }
  static async createPost(values) {
    return $api.post(`/posts`, values);
  }
}
