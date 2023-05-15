<template>
  <div id="payment-method" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/payment' }">Nạp tiền</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Nạp tiền từ ví điện tử MoMo</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Nạp tiền từ ví điện tử MOMO</h1>

      <div class="content-wrapper">
        <div class="left">
          <form class="form-payment">
            <h2 class="form-title">Chọn số tiền cần nạp</h2>
            <span class="subtitle">Chọn nhanh số tiền cần nạp</span>
            <el-radio-group v-model="radio" class="radio-group">
              <el-radio label="50000" :border="true">50.000 đ</el-radio>
              <el-radio label="10000" :border="true">100.000 đ</el-radio>
              <el-radio label="20000" :border="true">200.000 đ</el-radio>
              <el-radio label="500000" :border="true">500.000 đ</el-radio>
              <el-radio label="100000" :border="true">1.000.000 đ</el-radio>
              <el-radio label="200000" :border="true">2.000.000 đ</el-radio>
              <el-radio label="500000" :border="true">5.000.000 đ</el-radio>
            </el-radio-group>
            <span class="subtitle">Hoặc nhập số tiền cần nạp</span>
            <el-input v-model="input" placeholder="Please input" class="input-money">
              <template #append>đ</template>
            </el-input>
            <button class="btn-continue">
              <span>Tiếp tục</span><i class="bx bx-chevron-right"></i>
            </button>
          </form>
        </div>
        <div class="right">
          <balance-overview />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BalanceOverview from '@/components/client/BalanceOverview';
export default {
  data() {
    return {
      radio: 0,
      input: '',
    };
  },
  components: {
    BalanceOverview,
  },
};
</script>

<style scoped src="@/assets/styles/client/payment_method.css"></style>
