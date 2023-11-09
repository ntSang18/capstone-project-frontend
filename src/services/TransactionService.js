import instance from "./AxiosConfig";

const contentType = "application/json";

class TransactionService {
	get entity() {
		return "transaction";
	}

	async getTransactions() {
		try {
			const res = await instance(contentType).get(`${this.entity}`);
			return res;
		} catch (err) {
			return err;
		}
	}

	async getPersonalTransactions() {
		try {
			const res = await instance(contentType).get(
				`${this.entity}/personal`
			);
			return res;
		} catch (err) {
			return err;
		}
	}

	async getTransaction(id) {
		try {
			const res = await instance(contentType).get(`${this.entity}/${id}`);
			return res;
		} catch (err) {
			return err;
		}
	}

	async createTransaction(obj) {
		try {
			const res = await instance(contentType).post(`${this.entity}`, {
				...obj,
			});
			return res;
		} catch (err) {
			return err;
		}
	}

	async executeTransaction(obj) {
		try {
			const res = await instance(contentType).post(
				`${this.entity}/execute`,
				{ ...obj }
			);
			return res;
		} catch (err) {
			return err;
		}
	}

	async deleteTransaction(id) {
		try {
			const res = await instance(contentType).delete(
				`${this.entity}/${id}`
			);
			return res;
		} catch (err) {
			return err;
		}
	}
}

export default new TransactionService();
