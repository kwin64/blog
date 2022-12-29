import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { logout, selectIsAuth } from '../../redux/slices/auth'
import './MainHeader.scss'

export const MainHeader = () => {
	const isAuth = useSelector(selectIsAuth)

	const imageAuthUser = useSelector(state => state?.auth?.data?.avatarUrl?.url)

	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
	}
	const handleProfile = () => {
		alert('currently not available')
	}

	return (
		<div className='containerHeader'>
			<div
				style={{
					background: `url(${logo}) 100% 100% no-repeat`,
					backgroundSize: 'cover'
				}}
				className='img'>
				<Link
					className='containerLogo'
					to={'/'}></Link>
			</div>
			{isAuth ? (
				<div className='buttons'>
					<div
						onClick={handleProfile}
						className='imageProfile'
						style={{
							backgroundImage: `url(${imageAuthUser})`,
							borderRadius: '50%',
							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center center',
							backgroundSize: 'cover',
						}}
					/>
					<Button type='primary'>
						<Link to={'/posts/new'}>New post</Link>
					</Button>
					<Button
						danger
						onClick={handleLogout}
						style={{ marginLeft: '20px' }}
						type='primary'>
						Logout
					</Button>
				</div>
			) : (
				<div className='buttons'>
					<Button type='primary'>
						<Link to={'/login'}>Login</Link>
					</Button>
					<Button
						type='primary'
						style={{ marginLeft: '20px' }}>
						<Link to={'/registration'}>Signup</Link>
					</Button>
				</div>
			)}
		</div>
	)
}
export default MainHeader
