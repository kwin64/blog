import axios from 'axios';

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default $api;
