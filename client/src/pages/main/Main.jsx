import { Menu, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Post from '../../components/post/Post'
import { Preloader } from '../../components/preloader/Preloader'
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

	useEffect(() => {
		dispatch(fetchPosts())
		// dispatch(fetchTags());
	}, [dispatch])

	if (isLoading) {
		return <Preloader />
	}

	const handleFilter = e => {
		changeFilterValue(e.key)
	}

	return posts.length > 0 ? (
		<div className='container'>
			<Menu
				defaultSelectedKeys={[filter]}
				defaultOpenKeys={[filter]}
				style={styleMenu}
				onClick={handleFilter}
				items={[
					{ label: 'All', key: 'all' },
					{ label: 'Popular', key: 'popular' },
					{ label: 'My', key: 'my' }
				]}></Menu>
			{posts.map((obj, index) => (
				<Post
					key={index}
					post={obj}
				/>
			))}
		</div>
	) : (
		<Result
			style={{ marginTop: '200px' }}
			title='Posts were not found.'
		/>
	)
}
export default Main
