import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../service/AuthService';

export const fetchAuth = createAsyncThunk('posts/fetchAuth', async (params) => {
  const { data } = await AuthService.login(params);
  return data;
});

export const fetchRegistr = createAsyncThunk('posts/fetchRegistr', async (params) => {
  const { data } = await AuthService.registration(params);
  return data;
});

export const fetchAuthMe = createAsyncThunk('posts/fetchAuthMe', async () => {
  const { data } = await AuthService.authMe();
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchRegistr.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegistr.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegistr.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
