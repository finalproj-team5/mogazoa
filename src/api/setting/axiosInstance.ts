import axios from 'axios';

const axiosInstatnce = axios.create({
  baseURL: 'https://mogazoa-api.vercel.app/16-05',
});

axiosInstatnce.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer $token`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstatnce;
