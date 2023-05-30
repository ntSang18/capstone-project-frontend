import instance from './AxiosConfig';

const contentType = 'application/json';

class CatalogService {
  get entity() {
    return 'post-catalog';
  }

  async getCatalogs() {
    try {
      const res = await instance(contentType).get(`${this.entity}/public`);
      return res;
    } catch (err) {
      return err;
    }
  }

  async createCatalog(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async updateCatalog(id, obj) {
    try {
      const res = await instance(contentType).patch(`${this.entity}/${id}`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }

  async deleteCatalog(id) {
    try {
      const res = await instance(contentType).delete(`${this.entity}/${id}`);
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new CatalogService();
