import instance from './AxiosConfig';

const contentType = 'application/json';

class AuthService {
  get entity() {
    return 'auth';
  }

  async register(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/register`, {
        ...obj,
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  async login(obj) {
    try {
      const res = await instance(contentType).post(
        `${this.entity}/login`,
        { ...obj },
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async forgot(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/forgot`, {
        ...obj,
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  async reconfirm(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/reconfirm`, {
        ...obj,
      });
      return res;
    } catch (err) {
      return err;
    }
  }

  async googleOauth2(obj) {
    try {
      const res = await instance(contentType).post(
        `${this.entity}/google-oauth2`,
        {
          ...obj,
        },
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async logout() {
    try {
      const res = await instance(contentType).post(
        `${this.entity}/logout`,
        {},
        { withCredentials: true },
      );
      return res;
    } catch (err) {
      return err;
    }
  }

  async reset(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/reset`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async change(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/change`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new AuthService();
