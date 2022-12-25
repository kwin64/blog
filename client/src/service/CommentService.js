import $api from '../utils/axios'

export default class CommentService {
	static async createComment({ id, valueComment, dataUser }) {
		return $api.post(`/posts/${id}/comment`, { valueComment, dataUser })
	}
	static async getComments(id) {
		return $api.get(`/posts/comments/${id}`)
	}
	static async remove(idPost, idComment) {
		return $api.delete(`/posts/${idPost}/comment/${idComment}`)
	}
	static async getCurrentComment(id) {
		return $api.get(`/posts/comment/${id}`)
	}
	static async updateComment(id, valueComment) {
		return $api.patch(`/posts/comment/${id}`, { valueComment })
	}
}
