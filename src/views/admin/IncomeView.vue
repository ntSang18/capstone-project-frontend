<template>
	<main id="income" class="main-container">
		<div class="head-title">
			<div class="left">
				<h1 class="title">Doanh thu</h1>
				<el-breadcrumb separator="/" class="breadcrumb">
					<el-breadcrumb-item :to="{ path: '/admin' }"
						>Admin</el-breadcrumb-item
					>
					<el-breadcrumb-item>Doanh thu</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="btn-group">
				<button class="btn-download">
					<i class="bx bxs-cloud-download"></i>
					<span class="text">Download PDF</span>
				</button>
			</div>
		</div>

		<div id="transaction-overview" class="data-overview">
			<div class="data-chart data-section">
				<h2 class="title">Giao dịch người dùng</h2>
				<div v-if="dataReady">
					<Doughnut :data="transaction.data" :options="options" />
				</div>
			</div>
			<div class="data-table data-section">
				<el-table
					:data="transaction.list"
					stripe
					:default-sort="{ prop: 'created_at' }"
					style="width: 100%"
					height="300"
					cell-class-name="table-cell"
					header-cell-class-name="table-cell"
					max-height="300"
				>
					<el-table-column
						label="Ngày nạp"
						prop="created_at"
						sortable
						width="180"
					>
						<template #default="scope">
							<span>{{
								dateTimeFormatter(scope.row.created_at)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="User id"
						prop="user.id"
						width="90"
					/>
					<el-table-column
						label="Phương thức"
						prop="method"
						width="140"
					/>
					<el-table-column
						label="Giá"
						prop="money"
						sortable
						width="140"
					>
						<template #default="scope">
							<span>{{ toVnd(scope.row.money) }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Khuyến mãi"
						prop="discount"
						sortable
						width="140"
					>
						<template #default="scope">
							<span>{{ scope.row.discount * 100 }}%</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Thực nhận"
						prop="actual_money"
						sortable
						width="140"
					>
						<template #default="scope">
							<span>{{ toVnd(scope.row.actual_money) }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div id="payment-overview" class="data-overview">
			<div class="data-chart data-section">
				<h2 class="title">Thanh toán gói tin</h2>
				<div v-if="dataReady">
					<Doughnut :data="payment.data" :options="options" />
				</div>
			</div>
			<div class="data-table data-section">
				<el-table
					:data="payment.list"
					stripe
					:default-sort="{ prop: 'id' }"
					style="width: 100%"
					height="300"
					cell-class-name="table-cell"
					header-cell-class-name="table-cell"
					max-height="300"
				>
					<el-table-column
						label="Thời gian"
						prop="scope.row.paid_at"
						sortable
						width="180"
					>
						<template #default="scope">
							<span>{{
								dateTimeFormatter(scope.row.paid_at)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="Gói tin"
						prop="package_price.name"
						width="250"
					/>
					<el-table-column label="Loại tin" width="140">
						<template #default="scope">
							<p :class="`type ${scope.row.package_price.type}`">
								{{ typeName(scope.row.package_price.type) }}
							</p>
						</template>
					</el-table-column>
					<el-table-column
						label="Mã tin"
						prop="post.id"
						sortable
						width="90"
					/>
					<el-table-column
						label="Số lượng"
						prop="number_package"
						width="140"
					/>
					<el-table-column
						label="Tổng phí"
						prop="price"
						sortable
						width="140"
					>
						<template #default="scope">
							<span>{{
								toVnd(
									scope.row.number_package *
										scope.row.package_price.price
								)
							}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<div class="chart-overview">
			<div class="monthly data-section">
				<h2 class="title">Giao dịch người dùng hàng tháng</h2>
				<div v-if="dataReady" class="chart">
					<Bar :data="monthly.transaction" :options="options" />
				</div>
			</div>
			<div class="in-month data-section">
				<h2 class="title">Doanh thu trong tháng</h2>
				<div class="box-info">
					<img src="@/assets/images/icon/transaction.png" />
					<div class="content">
						<h3>Giao dịch người dùng</h3>
						<p>{{ toVnd(month.transaction) }}</p>
					</div>
				</div>
				<div class="box-info">
					<img src="@/assets/images/icon/purchase.png" />
					<div class="content">
						<h3>Thanh toán gói tin</h3>
						<p>{{ toVnd(month.payment) }}</p>
					</div>
				</div>
			</div>
			<div class="monthly data-section">
				<h2 class="title">Thanh toán gói tin hàng tháng</h2>
				<div v-if="dataReady" class="chart">
					<Line :data="monthly.payment" :options="options" />
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { Doughnut, Bar, Line } from "vue-chartjs";
import { toVnd } from "@/utils/numberFormatter";
import { dateTimeFormatter } from "@/utils/dateFormatter";
import { TYPES } from "@/common/postTypes";
import { METHODS } from "@/common/paymentMethods";
import { MONTHS } from "@/common/month";
import TransactionService from "@/services/TransactionService";
import PostPaymentService from "@/services/PostPaymentService";

export default {
	props: {
		changePage: Function,
	},
	components: {
		Doughnut,
		Bar,
		Line,
	},
	data() {
		return {
			transaction: {
				list: [],
				data: {
					labels: ["MoMo", "ZaloPay", "VNPay", "Paypal"],
					datasets: [
						{
							backgroundColor: ["#B0006E", "#0090EC", "#E11921", "#003087"],
							data: [],
						},
					],
				},
			},
			payment: {
				list: [],
				data: {
					labels: ["Vip 1", "Vip 2", "Vip 3", "Vip 4", "Normal"],
					datasets: [
						{
							backgroundColor: [
								"#E13427",
								"#EA2E9D",
								"#FF6600",
								"#3763e0",
								"#055699",
							],
							data: [],
						},
					],
				},
			},
			monthly: {
				transaction: {
					labels: MONTHS,
					datasets: [
						{
							label: "Doanh thu hàng tháng",
							backgroundColor: "#3C91E6",
							data: [],
						},
					],
				},
				payment: {
					labels: MONTHS,
					datasets: [
						{
							label: "Vip 1",
							backgroundColor: "#E13427",
							data: [],
						},
						{
							label: "Vip 2",
							backgroundColor: "#EA2E9D",
							data: [],
						},
						{
							label: "Vip 3",
							backgroundColor: "#FF6600",
							data: [],
						},
						{
							label: "Vip 4",
							backgroundColor: "#3763e0",
							data: [],
						},
						{
							label: "Tin thường",
							backgroundColor: "#055699",
							data: [],
						},
					],
				},
			},
			month: {
				transaction: 0,
				payment: 0,
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
			dataReady: false,
		};
	},
	async mounted() {
		this.changePage(6);
		await this.getTransactions();
		await this.getPostPayments();
		this.dataReady = true;
	},
	methods: {
		toVnd,
		dateTimeFormatter,
		async getTransactions() {
			const res = await TransactionService.getTransactions();
			if (res.status === 200) {
				this.transaction.list = res.data;
				this.getTransactionDoughnutData();
				this.getTransactionMonthlyData();
				this.getMonthTransaction();
			}
		},
		async getPostPayments() {
			const res = await PostPaymentService.getPostPayments();
			if (res.status === 200) {
				this.payment.list = res.data;
				this.getPaymentDoughnutData();
				this.getPaymentMonthlyData();
				this.getMonthPayment();
			}
		},
		getTransactionDoughnutData() {
			METHODS.forEach((method) => {
				const total = this.transaction.list.reduce(
					(accumulator, currentValue) => {
						if (currentValue.method === method.name) {
							return accumulator + currentValue.money;
						}
						return accumulator;
					},
					0
				);
				if (total) {
					this.transaction.data.datasets[0].data.push(total);
				} else {
					this.transaction.data.datasets[0].data.push(0);
				}
			});
		},
		getPaymentDoughnutData() {
			TYPES.forEach((type) => {
				const total = this.payment.list.reduce(
					(accumulator, currentValue) => {
						if (currentValue.package_price.type === type.value) {
							let amount =
								currentValue.number_package *
								currentValue.package_price.price;
							return accumulator + amount;
						}
						return accumulator;
					},
					0
				);
				if (total) {
					this.payment.data.datasets[0].data.push(total);
				} else {
					this.payment.data.datasets[0].data.push(0);
				}
			});
		},
		getTransactionMonthlyData() {
			const yearNow = new Date().getFullYear();
			for (var i = 0; i <= 11; i++) {
				const total = this.transaction.list.reduce(
					(accumulator, currentValue) => {
						const time = new Date(currentValue.created_at);
						if (
							time.getMonth() === i &&
							time.getFullYear() === yearNow
						) {
							return accumulator + currentValue.money;
						}
						return accumulator;
					},
					0
				);
				if (total) {
					this.monthly.transaction.datasets[0].data.push(total);
				} else {
					this.monthly.transaction.datasets[0].data.push(0);
				}
			}
		},
		getPaymentMonthlyData() {
			const yearNow = new Date().getFullYear();
			TYPES.forEach((type, index) => {
				for (var i = 0; i <= 11; i++) {
					const total = this.payment.list.reduce(
						(accumulator, currentValue) => {
							const time = new Date(currentValue.paid_at);
							if (
								time.getMonth() === i &&
								time.getFullYear() === yearNow &&
								currentValue.package_price.type === type.value
							) {
								let amount =
									currentValue.number_package *
									currentValue.package_price.price;
								return accumulator + amount;
							}
							return accumulator;
						},
						0
					);
					if (total) {
						this.monthly.payment.datasets[index].data.push(total);
					} else {
						this.monthly.payment.datasets[index].data.push(0);
					}
				}
			});
		},
		getMonthTransaction() {
			const now = new Date();
			const monthAmount = this.transaction.list.reduce(
				(accumulator, currentValue) => {
					const time = new Date(currentValue.created_at);
					if (
						time.getMonth() === now.getMonth() &&
						time.getFullYear() === now.getFullYear()
					) {
						return accumulator + currentValue.money;
					}
					return accumulator;
				},
				0
			);
			if (monthAmount) {
				this.month.transaction = monthAmount;
			} else {
				this.month.transaction = 0;
			}
		},
		getMonthPayment() {
			const now = new Date();
			const monthAmount = this.payment.list.reduce(
				(accumulator, currentValue) => {
					const time = new Date(currentValue.paid_at);
					if (
						time.getMonth() === now.getMonth() &&
						time.getFullYear() === now.getFullYear()
					) {
						let amount =
							currentValue.number_package *
							currentValue.package_price.price;
						return accumulator + amount;
					}
					return accumulator;
				},
				0
			);
			if (monthAmount) {
				this.month.payment = monthAmount;
			} else {
				this.month.payment = 0;
			}
		},
		typeName(type) {
			var res = TYPES.find((t) => t.value === type);
			return res.name;
		},
	},
};
</script>

<style src="@/assets/styles/admin/income.css"></style>
