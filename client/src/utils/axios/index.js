import axios from 'axios'

const $api = axios.create({
	baseURL: 'https://kwin64-blog.herokuapp.com',
	// baseURL: 'http://localhost:5080',
	withCredentials: true
})

$api.interceptors.request.use(config => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default $api
