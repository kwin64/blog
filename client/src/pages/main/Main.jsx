import { Button, Menu, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Post from '../../components/post/Post'
import { Preloader } from '../../components/preloader/Preloader'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchPosts } from '../../redux/slices/posts'
import './Main.scss'

const styleMenu = {
	position: 'fixed',
	height: '100%',
	left: 0,
	width: '150px',
	paddingTop: '100px',
	fontSize: '20px'
}

const Main = ({ posts, isLoading, filter, changeFilterValue }) => {
	const dispatch = useDispatch()
	const isAuth = useSelector(selectIsAuth)
	const navigate = useNavigate()

	const itemsMenu = [
		{ label: 'All', key: 'all' },
		{ label: 'Popular', key: 'popular' }
	]

	useEffect(() => {
		dispatch(fetchPosts())
	}, [dispatch])

	if (isLoading) {
		return <Preloader />
	}

	const handleFilter = e => {
		changeFilterValue(e.key)
	}
	const handleMainPage = e => {
		navigate(`/`)
	}

	if (isAuth) {
		itemsMenu.push({ label: 'My', key: 'my' })
	}

	return posts.length > 0 ? (
		<div className='container'>
			<Menu
				defaultSelectedKeys={[filter]}
				defaultOpenKeys={[filter]}
				style={styleMenu}
				onClick={handleFilter}
				items={itemsMenu}></Menu>
			{posts.map((obj, index) => (
				<Post
					key={index}
					post={obj}
				/>
			))}
		</div>
	) : (
		<Result
			className='notFoundPage'
			title='Posts were not found.'>
			<Button
				className='btn'
				onClick={handleMainPage}>
				Posts
			</Button>
		</Result>
	)
}
export default Main
