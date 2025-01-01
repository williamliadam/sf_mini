import Taro from '@tarojs/taro';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000',
});
http.interceptors.request.use((config) => {
  const token = Taro.getStorageSync('token')
  const refreshToken = Taro.getStorageSync('refreshToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      Taro.navigateTo({
        url: '/pages/login/login',
      });
    }
    return Promise.reject(error);
  }
);

export default http;