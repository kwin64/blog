
export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;

    await postModel.updateOne(
        {
          _id: postId,
        },
        {
          $push: {
            'comments': { user: req.userId, comment: req.body.comment },
            user: req.userId,
          },
        },
        {},

        res.json({ success: true }),
      )
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed update post',
    });
  }
};
