import axios from 'axios';
import store from '@/store';

const instance = contentType => {
  const instance = axios.create({ baseURL: process.env.VUE_APP_BACKEND_URL });

  instance.interceptors.request.use(
    config => {
      var header = {
        'Content-Type': contentType,
        // 'Referrer-Policy': 'no-referrer-when-downgrade',
      };
      if (store.state.client.token != null) {
        header.Authorization = `Bearer ${store.state.client.token}`;
      }
      if (store.state.admin.token != null) {
        header.Authorization = `Bearer ${store.state.admin.token}`;
      }
      config.headers = { ...header };
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  // instance.interceptors.response.use(
  //   response => response,
  //   async error => {
  //     if (error.response.status === 401) {
  //       const response = await instance.post('/auth/refresh', {}, { withCredentials: true });
  //       if (response.status === 200) {
  //         store.deToken(response.data);
  //         axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  //         return instance(error.config);
  //       }
  //     }
  //     return Promise.reject(error);
  //   },
  // );

  return instance;
};

export default instance;
