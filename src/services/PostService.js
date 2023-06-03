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

  async getPersonalPosts() {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/personal`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPublicPosts() {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/public`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPost(id) {
    try {
      const res = await instance(jsonContentType).get(`${this.entity}/public/${id}`);
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

  async createPost(obj) {
    try {
      const res = await instance(formContentType).post(`${this.entity}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async updatePost(id, obj) {
    try {
      const res = await instance(formContentType).patch(`${this.entity}/${id}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async confirmPost(obj) {
    try {
      const res = await instance(jsonContentType).patch(`${this.entity}/confirm`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async denyPost(id, obj) {
    try {
      const res = await instance(jsonContentType).patch(`${this.entity}/deny/${id}`, obj);
      return res;
    } catch (err) {
      return err;
    }
  }

  async deletePost(obj) {
    try {
      const res = await instance(jsonContentType).delete(`${this.entity}`, { data: { ...obj } });
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PostService();
