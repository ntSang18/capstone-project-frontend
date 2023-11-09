import instance from './AxiosConfig';

const formContentType = 'multipart/form-data';
const jsonContentType = 'application/json';

class UserService {
  get entity() {
    return 'user';
  }

  async getUsers() {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getUser(id) {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getCurrentUser() {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/current`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createUser(obj) {
    try {
      const res = await instance(jsonContentType).post(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async updateUser(id, obj) {
    try {
      const res = await instance(formContentType).patch(`${this.entity}/${id}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async lockUser(obj) {
    try {
      const res = await instance(jsonContentType).patch(`${this.entity}/lock`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async unlockUser(obj) {
    try {
      const res = await instance(jsonContentType).patch(`${this.entity}/unlock`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deleteUser(obj) {
    try {
      const res = await instance(jsonContentType).delete(`${this.entity}`, { data: { ...obj } });
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new UserService();
