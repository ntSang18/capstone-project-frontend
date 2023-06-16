<template>
  <div class="balance-overview">
    <div class="balance-wrapper">
      <span>Số dư tài khoản</span>
      <h3>{{ toVnd(user.balance) }}</h3>
    </div>
    <router-link to="/payment-history">
      <button class="link">
        <span>Lịch sử nạp tiền</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
    <router-link to="/purchase-history">
      <button class="link">
        <span>Lịch sử thanh toán</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
    <router-link to="/price">
      <button class="link">
        <span>Bảng giá dịch vụ</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { toVnd } from '@/utils/numberFormatter';
export default {
  computed: {
    ...mapState('client', ['user']),
  },
  methods: {
    toVnd,
  },
};
</script>

<style scoped src="@/assets/styles/client/balance_overview.css"></style>
