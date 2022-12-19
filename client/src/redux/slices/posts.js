import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostsService from '../../service/PostsService';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await PostsService.posts();
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  const { data } = await PostsService.removePost(id);
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
