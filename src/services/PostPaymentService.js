import instance from './AxiosConfig';

const contentType = 'application/json';

class PostPaymentService {
  get entity() {
    return 'post-payment';
  }

  async getPostPayments() {
    try {
      const res = await instance(contentType).get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPersonalPostPayments() {
    try {
      const res = await instance(contentType).get(`${this.entity}/personal`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPostPayment(id) {
    try {
      const res = await instance(contentType).get(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async purchase(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deletePostPayment(id) {
    try {
      const res = await instance(contentType).delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PostPaymentService();
