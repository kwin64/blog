import commentModel from "../models/comment-model.js";
import postModel from "../models/post-model.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;

    if(!req.body.valueComment){
      return res.json({ message: 'empty comment' });
    }

    const newComment = new commentModel({
      comment: req.body.valueComment,
      avatarUrl: req.body.dataUser.avatarUrl,
      name: req.body.dataUser.nickname,
    })
    await newComment.save();

    try {
      await postModel.findByIdAndUpdate(postId, {
        $push: {comments: newComment._id}
      })
    } catch (error) {
      console.log(error);
    }
    res.json(newComment)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed update post',
    });
  }
};
