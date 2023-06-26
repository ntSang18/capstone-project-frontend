<template>
	<div id="payment" class="main-container">
		<section id="breadcrumb">
			<el-breadcrumb>
				<el-breadcrumb-item :to="{ path: '/' }"
					>Trang chủ</el-breadcrumb-item
				>
				<el-breadcrumb-item :to="{ path: '/' }"
					>Nạp tiền</el-breadcrumb-item
				>
			</el-breadcrumb>
		</section>

		<section id="content" class="section">
			<h1 class="title">Nạp tiền vào tài khoản</h1>
			<div class="content-wrapper">
				<div class="left">
					<div v-if="promotion" class="alert">
						<div
							v-for="child in promotion.childs"
							:key="child.id"
							class="child-item"
						>
							<p v-if="child.end_range !== 999999999">
								Tặng thêm
								<strong>+{{ child.percent }}%</strong> cho giá
								trị nạp từ {{ toVnd(child.start_range) }} đến
								dưới
								{{ toVnd(child.end_range) }}
							</p>
							<p v-else>
								Tặng thêm
								<strong>+{{ child.percent }}%</strong> cho giá
								trị nạp trên
								{{ toVnd(child.start_range) }}
							</p>
						</div>
					</div>

					<div class="method">
						<h2 class="method-title">Chọn phương thức nạp tiền</h2>

						<div class="method-list">
							<router-link
								to="/payment-method/momo"
								class="method-item"
							>
								<div class="method-item-icon">
									<img src="@/assets/images/icon/momo.png" />
								</div>
								<div class="method-item-name">
									<span>MOMO</span>
								</div>
							</router-link>

							<router-link
								to="/payment-method/zalopay"
								class="method-item"
							>
								<div class="method-item-icon">
									<img
										src="@/assets/images/icon/zalopay.png"
									/>
								</div>
								<div class="method-item-name">
									<span>ZaloPay</span>
								</div>
							</router-link>

							<router-link
								to="/payment-method/vnpay"
								class="method-item"
							>
								<div class="method-item-icon">
									<img src="@/assets/images/icon/vnpay.png" />
								</div>
								<div class="method-item-name">
									<span>VNPay</span>
								</div>
							</router-link>

							<router-link
								to="/payment-method/paypal"
								class="method-item"
							>
								<div class="method-item-icon">
									<img
										src="@/assets/images/icon/paypal.png"
									/>
								</div>
								<div class="method-item-name">
									<span>Paypal</span>
								</div>
							</router-link>
						</div>
					</div>
					<div class="right"></div>
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
import { METHODS } from "@/common/paymentMethods";
import { toVnd } from "@/utils/numberFormatter";
export default {
	props: {
		promotion: Object,
	},
	components: {
		BalanceOverview,
	},
	data() {
		return {
			methods: [],
		};
	},
	computed: {
		listPromotionChild() {
			if (this.promotion) {
				return this.promotion.childs;
			}
			return [];
		},
	},
	async mounted() {
		this.methods = METHODS;
	},
	methods: {
		toVnd,
	},
};
</script>

<style scoped src="@/assets/styles/client/payment.css"></style>
