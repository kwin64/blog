import { EditOutlined, DeleteFilled } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { removeComment } from '../../redux/slices/comment'

const Comment = ({ comment }) => {
	const dispatch = useDispatch()
	const idPost = useParams().id
	const idComment = comment._id
	const authUserId = useSelector(state => state?.auth?.data?._id)

	const handleRemoveComment = () => {
		dispatch(removeComment({ idPost, idComment }))
	}

	const handleEditComment = () => {
		console.log(comment?._id)
	}

	return (
		<div className='commentContainer'>
			<div
				className='avatar'
				style={{
					backgroundImage: `url(${process.env.REACT_APP_API_URL}${comment?.avatarUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					backgroundSize: 'cover',
					borderRadius: '50%'
				}}></div>
			<div className='aboutComment'>
				<div className='userInfo'>
					<div className='name'>{comment?.name}</div>
					<div className='data'>
						{authUserId === comment?.idUser ? (
							<>
								<EditOutlined
									style={{ fontSize: '18px' }}
									onClick={handleEditComment}
								/>
								<DeleteFilled
									style={{ fontSize: '18px' }}
									onClick={handleRemoveComment}
								/>
							</>
						) : null}
						{moment().add('hh', 3).utc(comment?.createdAt).format(`DD-MM-YYYY hh:mm:ss a`)}
					</div>
				</div>
				<div className='comment'>{comment?.comment}</div>
			</div>
		</div>
	)
}
export default Comment
