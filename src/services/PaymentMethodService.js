import instance from './AxiosConfig';

const contentType = 'application/json';

class PaymentMethodService {
  get entity() {
    return 'payment-method';
  }

  async vnpayMethod(obj) {
    try {
      const res = await instance(contentType).post(`${this.entity}/vnpay`, { ...obj });
      return res;
    } catch (err) {
      return err;
    }
  }
}

export default new PaymentMethodService();
