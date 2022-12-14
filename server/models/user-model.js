const { Schema, model, default: mongoose } = require('mongoose');

const UserModel = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    activationLink: { type: String },
    isActivated: { type: Boolean, default: false },
    nickname: { type: String, required: true },
    // surname: { type: String, required: true },
    // job: { type: String, required: true },
    // avatarUrl: { type: String, required: true},
  },
  {
    timestamps: true,
  },
);

module.exports = model('User', UserModel);
