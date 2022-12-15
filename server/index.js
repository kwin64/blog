import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from './middlewares/auth-middleware.js';
import { loginValidation, registrationValidation } from './validation/auth.js';
import { postCreateValidation } from './validation/post.js';
import { register, login, getMe } from './controllers/user-controller.js';
import { create, getAll, getOne, remove, update } from './controllers/post-controller.js';

const PORT = 5080;
const DB_URL =
  'mongodb+srv://admin:q1w2e3r4@cluster0.0vp2jpw.mongodb.net/blog?retryWrites=true&w=majority';
export const JWT_ACCESS_SECRET = 'jwt-secret-key';
const JWT_REFRESH_SECRET = 'jwt-refresh-secret-key';
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 993;
const SMTP_USER = 'xoxylya6490@gmail.com';
const SMTP_PASSWORD = 'errgzpragsfehnft';
const API_URL = 'http://localhost:5080';
const CLIENT_URL = 'http://localhost:3000';

mongoose
  .connect(DB_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log('db error', err));

const app = express();
app.use(express.json());

app.post('/auth/register', registrationValidation, register);
app.post('/auth/login', loginValidation, login);
app.get('/auth/me', authMiddleware, getMe);

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', authMiddleware, postCreateValidation, create);
app.delete('/posts/:id', authMiddleware, remove);
app.patch('/posts/:id', update);

app.listen(PORT, () => console.log(`server started on ${PORT}`));
