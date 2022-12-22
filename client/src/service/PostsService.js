import $api from '../utils/axios';

export default class PostsService {
  static async posts() {
    return $api.get('/posts');
  }
  static async post(id) {
    return $api.get(`/posts/${id}`);
  }
  static async uploadImageForBlog(image) {
    return $api.post(`/upload`, image);
  }
  static async removePost(id) {
    return $api.delete(`/posts/${id}`);
  }
  static async uploadImageForBlog(image) {
    return $api.post(`/upload`, image);
  }
  static async createPost(values) {
    return $api.post(`/posts`, values);
  }
  static async createComment(id, comment) {
    return $api.patch(`/posts/${id}/comment`, { comment });
  }
  static async editPost(values, id) {
    return $api.patch(`/posts/${id}`, values);
  }
}
