import axios from 'axios';
import dayjs from 'dayjs';
import get from 'lodash/get';
import { rejectService } from '@/router/authGuard';
import $blockui from '@/services/blockuiService';

axios.defaults.baseURL = `${process.env.VUE_APP_BASE_URL}/v1`;


class AuthService {
  constructor() {
    this.$auth = axios.create();
    this.STORAGE = sessionStorage;
  }

  get value() {
    return JSON.parse(this.STORAGE.getItem('data'));
  }

  get token_expiration() {
    const auth = this.value;
    const period = get(auth, 'token_period', 0);
    return period > dayjs().unix();
  }

  isAuthenticated() {
    return new Promise((resolve) => {
      if (this.value && this.token_expiration) {
        return resolve('promise');
      }

      if (!this.value) {
        rejectService(true);
      }

      if (!this.token_expiration) {
        $blockui.show();
        rejectService(true).then(() => $blockui.close());
      }
    });
  }

  login(request) {
    const interceptor = this.$auth.interceptors.response.use(
      async (response) => {
        if (response.data) {
          this.success(response.data);
        }
      },
      (error) => error.response
    );

    const url = '/login';
    return this.$auth.post(url, request).finally(() => {
      this.$auth.interceptors.response.eject(interceptor);
    });
  }

  logout() {
    sessionStorage.removeItem('data');
    sessionStorage.removeItem('new_number');
  }

  async success(authData) {
    this.STORAGE.setItem('data', JSON.stringify(authData));
  }
}

export default new AuthService();
