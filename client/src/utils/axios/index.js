import axios from 'axios';

export const API_URL = 'http://localhost:5080/';

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// $api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (e) => {
//     const originalRequest = e.config;
//     if (e.response.status === 401) {
//       try {
//         const response = await axios.get(`${API_URL}/refresh`);
//         localStorage.setItem('token', response.accessToken);
//         return $api.request(originalRequest);
//       } catch (e) {
//         console.log('no authorise');
//       }
//     }
//   },
// );

export default $api;
