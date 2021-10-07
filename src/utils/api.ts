import axios from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';

const api = axios.create({
  baseURL: 'https://apidev.ewally.com.br',
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    Cookie.remove('token');
    Router.push('/');
  }
  return Promise.reject(error);
});

api.interceptors.request.use(async (config) => {
  const token = Cookie.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
