import postModel from '../models/post-model.js';

export const create = async (req, res) => {
  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to create post',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await postModel.find().populate('user').exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to get posts',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    postModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'failed return article',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'article not found',
          });
        }

        res.json(doc);
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to get posts',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    postModel.findOneAndDelete(
      {
        _id: postId,
      },
      (error, doc) => {
        if (error) {
          console.log(error);
          return res.status(500).json({
            message: 'failed remove article',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'article not found',
          });
        }

        res.json({ success: true });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to get posts',
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed update post',
    });
  }
};