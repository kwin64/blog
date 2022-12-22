import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import {
  create,
  getAllPosts, getOne, getTags, remove,
  update
} from './controllers/post-controller.js';
import authMiddleware from './middlewares/auth-middleware.js';
import validationErrorsMiddleware from './middlewares/validationErrors-middleware.js';
import authRoute from './routes/auth.js';
import commentRoute from './routes/comments.js';
import postsRoute from './routes/posts.js';
import { postCreateValidation } from './validation/post.js';
dotenv.config();

mongoose.set('strictQuery', false);
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

//Routes
app.use('/auth',authRoute)
app.use('/posts',postsRoute)
app.use('/comments',commentRoute)
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// app.post('/auth/register', registrationValidation, validationErrorsMiddleware, register);
// app.post('/auth/login', loginValidation, validationErrorsMiddleware, login);
// app.get('/auth/me', authMiddleware, getMe);


app.get('/posts', getAllPosts);
app.get('/posts/tags', getTags);
app.get('/posts/:id', getOne);
app.post('/posts', authMiddleware, postCreateValidation, validationErrorsMiddleware, create);
// app.patch('/comments', authMiddleware, addComment);
app.delete('/posts/:id', authMiddleware, remove);
app.patch('/posts/:id', authMiddleware, postCreateValidation, validationErrorsMiddleware, update);

app.listen(process.env.PORT, () => console.log(`server started on ${process.env.PORT}`));
