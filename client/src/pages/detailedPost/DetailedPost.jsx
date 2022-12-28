import { EyeOutlined } from '@ant-design/icons'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comment from '../../components/comment/Comment'
import { Preloader } from '../../components/preloader/Preloader'
import { selectIsAuth } from '../../redux/slices/auth'
import { createComment, fetchComments } from '../../redux/slices/comment'
import PostsService from '../../service/PostsService'
import './Post.scss'

const DetailedPost = () => {
	const { id } = useParams()
	const dataComments = useSelector(state => state.comment)
	const dataUser = useSelector(state => state?.auth?.data)

	const [data, setData] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [valueComment, setValueComment] = useState('')

	const isAuth = useSelector(selectIsAuth)
	const dispatch = useDispatch()

	const sendComment = () => {
		try {
			if (valueComment.trim().length > 0) {
				setIsLoading(true)
				dispatch(createComment({ id, valueComment, dataUser }))
				setValueComment('')
			} else {
				alert('Comment empty')
				setValueComment('')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const fetchPost = useCallback(async () => {
		try {
			PostsService.post(id)
				.then(res => {
					setData(res.data)
					setIsLoading(false)
				})
				.catch(error => {
					console.log(error)
				})
		} catch (error) {
			console.log(error)
		}
	}, [id])

	useEffect(() => {
		fetchPost()
	}, [id])

	useEffect(() => {
		try {
			setIsLoading(false)
			dispatch(fetchComments(id))
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(true)
		}
	}, [id, dispatch])

	console.log(data)
	return isLoading ? (
		<Preloader />
	) : (
		<div className='containerPost'>
			<div className='user'>
				<div
					className='avatar'
					style={{
						backgroundImage: `url(${data?.user?.avatarUrl?.url})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize: 'cover'
					}}></div>
				<div>
					<h1>{data.user.nickname}</h1>
					<p>{moment().add('hh', 3).utc(data?.createdAt).format(`DD-MM-YYYY hh:mm:ss a`)}</p>
				</div>
			</div>
			<div className='title'>{data?.title}</div>

			{data.imageUrl && (
				<div
					className='image'
					style={{
						backgroundImage: `url(https://kwin64-blog.herokuapp.com/${data.imageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize: 'cover'
					}}></div>
			)}

			<div className='aboutPost'>
				<div className='article'>{data?.text}</div>
				<div className='tag'>
					{data?.tags.map((tag, index) => (
						<a key={index}>{`${tag}`}</a>
					))}
				</div>
			</div>
			<div className='viewsCount'>
				<EyeOutlined />
				<p>{data?.viewsCount}</p>
			</div>
			<div className='comments'>
				{dataComments.comments.map((comment, index) => {
					return (
						<Comment
							key={index}
							comment={comment}
						/>
					)
				})}
			</div>

			{isAuth && (
				<div className='commentForm'>
					<textarea
						type='text'
						onChange={e => setValueComment(e.target.value)}
						value={valueComment}
						placeholder='comment...'
					/>
					<button
						disabled={!valueComment && true}
						onClick={sendComment}>
						Send
					</button>
				</div>
			)}
		</div>
	)
}
export default DetailedPost
