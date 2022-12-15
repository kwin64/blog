import mongoose from 'mongoose';

const PostModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: { type: Array, default: [] },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostModel);
