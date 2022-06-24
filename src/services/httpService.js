import axios from 'axios';
import $auth from './authService';
import get from 'lodash/get';

class HttpService {
  constructor() {
    this.$http = axios.create();
    this.init();
  }

  init() {
    this.$http.interceptors.request.use((config) => {
      const token = get($auth.value, 'token', '');
      config.headers['Authorization'] = 'Bearer ' + token;
      return config;
    });

    this.$http.interceptors.response.use(
      (response) => {
        // console.log('レスポンスデータ: ', response);
        return response;
      },
      (error) => {
        // console.log('error: ', error)
        if (error.response.data.message === 'Unauthenticated.') {
          $auth.refresh();
        }
        return Promise.reject(error);
      }
    );
  }

  async get(uri, params) {
    await $auth.isAuthenticated();
    return this.$http.get(`${uri}`, { params: params });
  }

  async post(uri, params) {
    await $auth.isAuthenticated();
    return this.$http.post(`${uri}`, params);
  }

  async put(uri, params) {
    await $auth.isAuthenticated();
    return this.$http.put(`${uri}`, params);
  }

  async delete(uri, params) {
    await $auth.isAuthenticated();
    return this.$http.delete(`${uri}`, params);
  }
}

export default new HttpService();
