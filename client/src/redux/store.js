import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { commentReducer } from './slices/comment';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comment: commentReducer,
  },
});

export default store;
