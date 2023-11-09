<template>
	<el-dialog
		v-model="modelDialogVisible"
		:show-close="false"
		width="60%"
		top="5vh"
		class="manage-dialog"
		@open="setupData()"
	>
		<template #header>
			<div class="dialog-header">
				<h2 v-if="isExtend" class="dialog-title">
					Gia hạn bài đăng #{{ post.id }}
				</h2>
				<h2 v-else class="dialog-title">
					Thanh toán bài đăng #{{ post.id }}
				</h2>
				<i class="bx bx-x" @click="closeDialog()"></i>
			</div>
		</template>
		<div class="dialog-body">
			<div class="payment-container">
				<div class="payment-content">
					<div class="inp-group">
						<label class="main-label">Chọn loại tin</label>
						<ul class="list-type">
							<div
								v-for="(postType, index) in types"
								:key="index"
								:class="`type-item ${postType.value}`"
							>
								<input
									type="radio"
									:value="postType.value"
									:id="`type-${index}`"
									:disabled="
										isExtend &&
										info.postType !== postType.value
									"
									v-model="info.postType"
								/>
								<label :for="`type-${index}`">{{
									postType.name
								}}</label>
							</div>
						</ul>
					</div>
					<div class="inp-group">
						<label class="main-label">Chọn gói tin</label>
						<ul class="list-package-price">
							<div
								v-for="packagePrice in listPackagePrice"
								:key="packagePrice.id"
								:class="`package-price-item ${packagePrice.type}`"
							>
								<input
									type="radio"
									:value="packagePrice.id"
									:id="`package-price-${packagePrice.id}`"
									v-model="info.packagePrice"
								/>
								<label :for="`package-price-${packagePrice.id}`"
									><h3 class="name">
										{{ packagePrice.name }}
									</h3>
									<div class="price">
										<i class="bx bx-purchase-tag"></i>
										<span>{{
											toVnd(packagePrice.price)
										}}</span>
									</div>
									<div class="time">
										<i class="bx bx-time"></i>
										<span
											><Strong
												>{{
													packagePrice.number_of_days
												}}
												ngày</Strong
											>
											kể từ khi đăng ký</span
										>
									</div>
								</label>
							</div>
						</ul>
					</div>
					<div class="inp-group">
						<label class="main-label" for="number-package"
							>Số lượng gói tin</label
						>
						<el-input-number
							id="number-package"
							:min="1"
							v-model="info.number"
							controls-position="right"
						/>
					</div>
				</div>
				<div class="balance-container">
					<div class="balance-overview">
						<div class="balance-wrapper">
							<span>Số dư tài khoản</span>
							<h3>{{ toVnd(user.balance) }}</h3>
						</div>
						<router-link to="/payment">
							<button class="link">
								<span>Nạp tiền</span>
								<i class="bx bx-chevron-right"></i>
							</button>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="closeDialog()">Thoát</el-button>
				<el-button type="primary" @click="purchase()"
					>Thanh toán</el-button
				>
			</div>
		</template>
	</el-dialog>
</template>

<script>
import { TYPES } from "@/common/postTypes";
import { STATUS } from "@/common/postStatuses";
import PackagePriceService from "@/services/PackagePriceService";
import PostPaymentService from "@/services/PostPaymentService";
import UserService from "@/services/UserService";
import { toVnd } from "@/utils/numberFormatter";
import { mapActions, mapState } from "vuex";
import { isExpired } from "@/utils/isExpired";
import { ElLoading } from "element-plus";
export default {
	props: {
		dialogVisible: Boolean,
		post: Object,
		getPosts: Function,
	},
	data() {
		return {
			info: {
				postType: "VIP_1",
				packagePrice: 0,
				number: 1,
			},
			packagePrices: [],
			types: [],
			isExtend: false,
			dataReady: false,
		};
	},
	mounted() {
		this.types = TYPES;
		this.getPackagePrices();
	},
	computed: {
		...mapState("client", ["user"]),
		modelDialogVisible: {
			get() {
				return this.dialogVisible;
			},
			set(value) {
				this.$emit("triggerDialog", value);
			},
		},
		listPackagePrice() {
			return this.packagePrices.filter(
				(packagePrice) => packagePrice.type === this.info.postType
			);
		},
	},
	methods: {
		...mapActions("client", ["setUser"]),
		isExpired,
		toVnd,
		loading() {
			const loading = ElLoading.service({
				text: "Loading",
				background: "rgba(0, 0, 0, 0.7)",
			});
			if (this.dataReady) {
				loading.close();
			}
		},
		async getPackagePrices() {
			const res = await PackagePriceService.getPackagePrices();
			if (res.status === 200) {
				this.packagePrices = res.data;
			}
		},
		async purchase() {
			if (!this.checkInfo()) {
				return;
			}
			this.loading();
			this.dataReady = false;
			const obj = {
				post_id: this.post.id,
				package_price_id: this.info.packagePrice,
				number_package: this.info.number,
			};
			const res = await PostPaymentService.purchase(obj);
			if (res.status === 200) {
				const response = await UserService.getCurrentUser();
				if (response.status === 200) {
					this.setUser(response.data);
				}
				this.$store.state.toast.success("Mua gói tin thành công!");
				this.getPosts();
				this.closeDialog();
				this.dataReady = true;
			} else {
				this.$store.state.toast.error("Có lỗi xảy ra!");
				this.dataReady = true;
			}
		},
		setupData() {
			this.dataReady = false;
			if (this.post.status === STATUS.PUBLIC) {
				if (!isExpired(this.post.expired_at)) {
					this.isExtend = true;
					this.info.postType = this.post.type;
				}
			}
		},
		checkInfo() {
			const packagePrice = this.packagePrices.find(
				(p) => p.id === this.info.packagePrice
			);
			var totalAmount = this.info.number * packagePrice.price;
			if (!this.info.packagePrice || !this.info.number) {
				this.$store.state.toast.info("Vui lòng nhập đầy đủ thông tin!");
				return false;
			}
			if (this.user.balance < totalAmount) {
				this.$store.state.toast.info("Số dư không đủ!");
				return false;
			}
			return true;
		},
		clearDialog() {
			this.info.postType = "VIP_1";
			this.info.packagePrice = 0;
			this.info.number = 1;
			this.isExtend = false;
			this.dataReady = false;
		},
		closeDialog() {
			this.clearDialog();
			this.modelDialogVisible = false;
		},
	},
	watch: {
		"info.postType"() {
			this.info.packagePrice = 0;
		},
		dataReady() {
			if (this.dataReady) {
				this.loading();
			}
		},
	},
};
</script>

<style src="@/assets/styles/client/manage_dialog.css"></style>
