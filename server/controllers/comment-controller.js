import commentModel from '../models/comment-model.js'
import postModel from '../models/post-model.js'

export const createComment = async (req, res) => {
	try {
		const postId = req.params.id

		if (!req.body.valueComment) {
			return res.json({ message: 'empty comment' })
		}

		const newComment = new commentModel({
			idUser: req.body.dataUser._id,
			comment: req.body.valueComment,
			avatarUrl: req.body.dataUser.avatarUrl,
			name: req.body.dataUser.nickname
		})
		await newComment.save()

    console.log(newComment);

		try {
			await postModel.findByIdAndUpdate(postId, {
				$push: { comments: newComment._id }
			})
		} catch (error) {
			console.log(error)
		}
		res.json(newComment)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed update post'
		})
	}
}

export const removeComment = async (req, res) => {
	try {
		const idPost = req.params.id
		const idComment = req.params.idComment

		const post = await postModel.findById(idPost)

		// console.log(post)

		const test = postModel.updateOne({ _id: idPost }, { $pop: idComment })
		console.log(test)
		// commentModel.findOneAndDelete(
		// 	{
		// 		_id: idComment
		// 	},
		// 	(error, doc) => {
		// 		if (error) {
		// 			console.log(error)
		// 			return res.status(500).json({
		// 				message: 'failed remove comment'
		// 			})
		// 		}

		// 		if (!doc) {
		// 			return res.status(404).json({
		// 				message: 'comment not found'
		// 			})
		// 		}

		// 		res.json({ success: true })
		// 	}
		// )
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'failed to get comments'
		})
	}
}
