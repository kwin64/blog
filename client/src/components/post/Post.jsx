import { CommentOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemovePost } from '../../redux/slices/posts'

const Post = ({ post }) => {
	const userData = useSelector(state => state.auth.data)
	const dispatch = useDispatch()

	const removePost = () => {
		dispatch(fetchRemovePost(post._id))
	}

	return !post ? (
		<div>No Posts</div>
	) : (
		<div className='post'>
			{post.imageUrl ? (
				<div
					className='image'
					style={{
						backgroundImage: `url(${process.env.REACT_APP_API_URL}${post.imageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
						backgroundSize: 'cover'
					}}></div>
			) : (
				<Skeleton.Image
					className='image'
					active={false}
					style={{
						height: '100%'
					}}
				/>
			)}
			<div className='containerAboutPost'>
				<Link
					className='title'
					to={`/posts/${post._id}`}>
					{post.title}
				</Link>
				<div className='footerPost'>
					<div className='infoPost'>
						<div className='comment'>
							<CommentOutlined />
							<p>{post.comments.length}</p>
						</div>
						<div className='view'>
							<EyeOutlined />
							<p>{post.viewsCount}</p>
						</div>
					</div>

					<div className='editContainer'>
						<div className='edit'>
							{userData?._id === post.user?._id && (
								<>
									<Link to={`/posts/${post._id}/edit`}>
										<EditOutlined />
									</Link>
								</>
							)}
						</div>
						{userData?._id === post.user?._id && <DeleteOutlined onClick={removePost} />}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Post
