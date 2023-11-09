import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_ADDRESS_API,
  headers: { 'Content-Type': 'application/json' },
});

class AddressService {
  async getProvinces() {
    try {
      const res = await instance.get(`province`);
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async getDistricts(id) {
    try {
      const res = await instance.get(`province/district/${id}`);
      return res;
    } catch (err) {
      return { err: err };
    }
  }

  async getWards(id) {
    try {
      const res = await instance.get(`province/ward/${id}`);
      return res;
    } catch (err) {
      return { err: err };
    }
  }
}

export default new AddressService();
