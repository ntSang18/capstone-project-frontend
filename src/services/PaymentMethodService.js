import instance from "./AxiosConfig";

const contentType = "application/json";

class PaymentMethodService {
	get entity() {
		return "payment-method";
	}

	async generateUrl(method, obj) {
		try {
			const res = await instance(contentType).post(
				`${this.entity}/${method}`,
				{ ...obj }
			);
			return res;
		} catch (err) {
			return err;
		}
	}
}

export default new PaymentMethodService();
