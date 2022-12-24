import { EditOutlined, DeleteFilled } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'

const Comment = ({ comment }) => {
	const authUserId = useSelector(state => state?.auth?.data?._id)
	const commentUserId = comment?.idUser

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
					<div className='name'>{comment.name}</div>
					<div className='data'>
						{authUserId === commentUserId ? (
							<>
								<EditOutlined
									style={{ fontSize: '18px' }}
									onClick={e => console.log(comment._id)}
								/>
								<DeleteFilled
									style={{ fontSize: '18px' }}
									onClick={e => console.log(comment._id)}
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
