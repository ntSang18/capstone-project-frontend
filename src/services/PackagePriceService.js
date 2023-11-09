import instance from './AxiosConfig';

const contentType = 'application/json';

class PackagePriceService {
  get entity() {
    return 'package-price';
  }

  async getPackagePrices() {
    try {
      const res = await instance(contentType).get(`${this.entity}/public`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createPackagePrice(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async updatePackagePrice(id, obj) {
    try {
      const res = await instance(contentType).patch(`${this.entity}/${id}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deletePackagePrice(id) {
    try {
      const res = await instance(contentType).delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PackagePriceService();
