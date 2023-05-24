import instance from './AxiosConfig';

const formContentType = 'multipart/form-data';
const jsonContentType = 'application/json';

class PostService {
  get entity() {
    return 'post';
  }

  async getPosts() {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPost(id) {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createPublicPost(obj) {
    try {
      const res = await instance(formContentType).post(`${this.entity}/create-public`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PostService();
