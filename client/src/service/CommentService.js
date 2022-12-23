import $api from '../utils/axios';

export default class CommentService {
  static async createComment({id, valueComment, dataUser}) {
    return $api.post(`/posts/${id}/comment`,  {valueComment, dataUser} );
  }
  static async getComments(id) {
    return $api.get(`/posts/comments/${id}`);
  }
}
