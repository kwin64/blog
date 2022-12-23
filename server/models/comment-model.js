import mongoose from 'mongoose';

const CommentModel = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    avatarUrl: {type: String, required: true},
    name: {type: String, required: true},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Comment', CommentModel);
