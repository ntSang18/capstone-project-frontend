<template>
  <div class="balance-overview">
    <div class="balance-wrapper">
      <span>Số dư tài khoản</span>
      <h3>0đ</h3>
    </div>
    <router-link to="/">
      <button class="link">
        <span>Lịch sử nạp tiền</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
    <router-link to="/">
      <button class="link">
        <span>Lịch sử thanh toán</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
    <router-link to="/">
      <button class="link">
        <span>Bảng giá dịch vụ</span>
        <i class="bx bx-chevron-right"></i>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="@/assets/styles/client/balance_overview.css"></style>
