<template>
	<div id="transaction">
		<div class="transaction-container">
			<img v-if="!dataReady" src="@/assets/images/icon/loading.png" />
			<img
				v-if="dataReady && isSuccess"
				src="@/assets/images/icon/success.png"
			/>
			<img
				v-if="dataReady && !isSuccess"
				src="@/assets/images/icon/error.png"
			/>
			<h2 v-if="!dataReady">Đang sử lý...</h2>
			<h2 v-if="dataReady && isSuccess">Giao dịch thành công</h2>
			<h2 v-if="dataReady && !isSuccess">Giao dịch thất bại</h2>
			<p v-if="!dataReady">
				Giao dịch của bạn đang được hệ thống sử lý. Vui lòng đợi trong
				giây lát.
			</p>
			<p v-if="dataReady && isSuccess">
				Giao dịch của bạn đã hoàn tất. Vui lòng kiểm tra lại số dư tài
				khoản.
			</p>
			<p v-if="dataReady && !isSuccess">
				Có lỗi xảy ra. Vui lòng thử lại sau.
			</p>
			<div class="btn-group">
				<router-link to="/">
					<button>Trang chủ</button>
				</router-link>
				<router-link to="/payment-history">
					<button>Lịch sử nạp tiền</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import TransactionService from "@/services/TransactionService";
import UserService from "@/services/UserService";
import { ElLoading } from "element-plus";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			dataReady: false,
			isSuccess: false,
		};
	},
	mounted() {
		if (this.$route.params.name === "vnpay") {
			this.handleVNPayTransaction();
		} else if (this.$route.params.name === "paypal") {
			this.handlePaypalTransaction();
		}
	},
	methods: {
		...mapActions("client", ["setUser"]),
		loading() {
			const loading = ElLoading.service({
				text: "Loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			if (this.dataReady) {
				loading.close();
			}
		},
		async handleVNPayTransaction() {
			this.loading();
			this.dataReady = false;
			const amount = this.$route.query.vnp_Amount;
			const status = this.$route.query.vnp_ResponseCode;
			if (status != "00") {
				this.dataReady = true;
				return;
			}
			const obj = {
				money: amount / 100,
				method: "VNPAY",
			};
			const res = await TransactionService.createTransaction(obj);
			if (res.status === 200) {
				const response = await UserService.getCurrentUser();
				if (response.status === 200) {
					this.setUser(response.data);
				}
				this.dataReady = true;
				this.isSuccess = true;
			} else {
				this.dataReady = true;
				this.isSuccess = false;
			}
		},
		async handlePaypalTransaction() {
			this.loading();
			this.dataReady = false;
			const paymentId = this.$route.query.paymentId;
			const payerId = this.$route.query.PayerID;
			const obj = {
				payment_id: paymentId,
				payer_id: payerId,
			};
			const res = await TransactionService.executeTransaction(obj);
			if (res.status === 200) {
				const response = await UserService.getCurrentUser();
				if (response.status === 200) {
					this.setUser(response.data);
				}
				this.dataReady = true;
				this.isSuccess = true;
			} else {
				this.dataReady = true;
				this.isSuccess = false;
			}
		},
	},
	watch: {
		dataReady() {
			if (this.dataReady) {
				this.loading();
			}
		},
	},
};
</script>

<style scoped src="@/assets/styles/client/transaction.css"></style>
