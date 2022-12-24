import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import CommentService from '../../service/CommentService'

export const createComment = createAsyncThunk('comment/createComment', async dataComment => {
	const { data } = await CommentService.createComment(dataComment)
	return data
})

export const fetchComments = createAsyncThunk('comment/fetchComments', async id => {
	const { data } = await CommentService.getComments(id)
	return data
})

export const removeComment = createAsyncThunk(
	'comment/removeComment',
	async ({ idPost, idComment }) => {
		const { data } = await CommentService.remove(idPost, idComment)
		return data
	}
)

const initialState = {
	comments: [],
	status: 'loading'
}

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: {
		[createComment.pending]: state => {
			state.status = 'loading'
		},
		[createComment.fulfilled]: (state, action) => {
			state.comments.push(action.payload)
			state.status = 'loaded'
		},
		[createComment.rejected]: state => {
			state.comments = []
			state.status = 'error'
		},

		[fetchComments.pending]: state => {
			state.status = 'loading'
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments = action.payload
			state.status = 'loaded'
		},
		[fetchComments.rejected]: state => {
			state.comments = []
			state.status = 'error'
		},

		[removeComment.pending]: (state, action) => {
			state.comments = state.comments.filter(comment => comment._id !== action.meta.arg.idComment)
			state.status = 'loading'
		}
	}
})

export const commentReducer = commentSlice.reducer
