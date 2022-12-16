import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authMiddleware from './middlewares/auth-middleware.js';
import { loginValidation, registrationValidation } from './validation/auth.js';
import { postCreateValidation } from './validation/post.js';
import { register, login, getMe } from './controllers/user-controller.js';
import {
  create,
  getAllPosts,
  getTags,
  getOne,
  remove,
  update,
} from './controllers/post-controller.js';
import multer from 'multer';
import validationErrorsMiddleware from './middlewares/validationErrors-middleware.js';
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('db error', err));

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registrationValidation, validationErrorsMiddleware, register);
app.post('/auth/login', loginValidation, validationErrorsMiddleware, login);
app.get('/auth/me', authMiddleware, getMe);
app.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.get('/posts', getAllPosts);
app.get('/posts/tags', getTags);
app.get('/posts/:id', getOne);
app.post('/posts', authMiddleware, postCreateValidation, validationErrorsMiddleware, create);
app.delete('/posts/:id', authMiddleware, remove);
app.patch('/posts/:id', authMiddleware, postCreateValidation, validationErrorsMiddleware, update);

app.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));
