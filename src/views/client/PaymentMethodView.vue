<template>
	<div id="payment-method" class="main-container">
		<section id="breadcrumb">
			<el-breadcrumb>
				<el-breadcrumb-item :to="{ path: '/' }"
					>Trang chủ</el-breadcrumb-item
				>
				<el-breadcrumb-item :to="{ path: '/payment' }"
					>Nạp tiền</el-breadcrumb-item
				>
				<el-breadcrumb-item :to="{ path: '/' }"
					>Nạp tiền từ ví điện tử {{ methodName }}</el-breadcrumb-item
				>
			</el-breadcrumb>
		</section>

		<section id="content" class="section">
			<h1 class="title">Nạp tiền từ ví điện tử {{ methodName }}</h1>

			<div class="content-wrapper">
				<div class="left">
					<div class="form-payment">
						<h2 class="form-title">Chọn số tiền cần nạp</h2>
						<span class="subtitle">Chọn nhanh số tiền cần nạp</span>
						<el-radio-group v-model="amount" class="radio-group">
							<el-radio :label="50000" :border="true"
								>50.000 đ</el-radio
							>
							<el-radio :label="100000" :border="true"
								>100.000 đ</el-radio
							>
							<el-radio :label="200000" :border="true"
								>200.000 đ</el-radio
							>
							<el-radio :label="500000" :border="true"
								>500.000 đ</el-radio
							>
							<el-radio :label="1000000" :border="true"
								>1.000.000 đ</el-radio
							>
							<el-radio :label="2000000" :border="true"
								>2.000.000 đ</el-radio
							>
							<el-radio :label="5000000" :border="true"
								>5.000.000 đ</el-radio
							>
						</el-radio-group>
						<span class="subtitle">Hoặc nhập số tiền cần nạp</span>
						<el-input
							v-model="amount"
							placeholder="Please input"
							type="number"
							class="input-money"
						>
							<template #append>đ</template>
						</el-input>
						<button class="btn-continue" @click="createPayment()">
							<span>Tiếp tục</span
							><i class="bx bx-chevron-right"></i>
						</button>
					</div>
				</div>
				<div class="right">
					<balance-overview />
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import BalanceOverview from "@/components/client/BalanceOverview";
import PaymentMethodService from "@/services/PaymentMethodService";
import { METHOD, METHODS } from "@/common/paymentMethods";
export default {
	data() {
		return {
			methodName: "",
			amount: "",
		};
	},
	components: {
		BalanceOverview,
	},
	mounted() {
		this.setup();
	},
	methods: {
		setup() {
			const method = METHODS.find(
				(method) => method.value === this.$route.params.name
			);
			this.methodName = method.name;
		},
		async createPayment() {
			const obj = {
				amount: this.amount,
			};
			var res = null;
			if (this.$route.params.name === METHOD.VNPAY) {
				res = await PaymentMethodService.generateUrl("vnpay", obj);
			} else if (this.$route.params.name === METHOD.PAYPAL) {
				res = await PaymentMethodService.generateUrl("paypal", obj);
			}
			if (res.status === 200) {
				window.open(res.data.url, "_blank");
			}
		},
	},
};
</script>

<style scoped src="@/assets/styles/client/payment_method.css"></style>
