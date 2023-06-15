import instance from './AxiosConfig';

const contentType = 'application/json';

class PromotionService {
  get entity() {
    return 'promotion';
  }

  async getCurrentPromotion() {
    try {
      const res = await instance(contentType).get(`${this.entity}/public/current`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getPromotions() {
    try {
      const res = await instance(contentType).get(`${this.entity}`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createPromotion(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async updatePromotion(id, obj) {
    try {
      const res = await instance(contentType).patch(`${this.entity}/${id}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deletePromotion(id) {
    try {
      const res = await instance(contentType).delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PromotionService();
