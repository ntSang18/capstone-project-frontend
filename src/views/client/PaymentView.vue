<template>
  <div id="payment" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Nạp tiền</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Nạp tiền vào tài khoản</h1>
      <div class="content-wrapper">
        <div class="left">
          <div class="alert">
            <p>Tặng thêm <strong>+10%</strong> cho giá trị nạp từ 50.000đ đến dưới 1.000.000đ</p>
            <p>Tặng thêm <strong>+20%</strong> cho giá trị nạp từ 1.000.000đ đến dưới 2.000.000đ</p>
            <p>Tặng thêm <strong>+25%</strong> cho giá trị nạp trên 2.000.000đ</p>
          </div>

          <div class="method">
            <h2 class="method-title">Chọn phương thức nạp tiền</h2>

            <div class="method-list">
              <router-link to="/payment-method/momo" class="method-item">
                <div class="method-item-icon">
                  <img src="@/assets/images/icon/momo.png" />
                </div>
                <div class="method-item-name"><span>MOMO</span></div>
              </router-link>

              <router-link to="/payment-method/zalopay" class="method-item">
                <div class="method-item-icon">
                  <img src="@/assets/images/icon/zalopay.png" />
                </div>
                <div class="method-item-name"><span>ZaloPay</span></div>
              </router-link>

              <router-link to="/payment-method/vnpay" class="method-item">
                <div class="method-item-icon">
                  <img src="@/assets/images/icon/vnpay.png" />
                </div>
                <div class="method-item-name"><span>VNPay</span></div>
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
import BalanceOverview from '@/components/client/BalanceOverview';
import { METHODS } from '@/common/paymentMethods';
export default {
  components: {
    BalanceOverview,
  },
  data() {
    return {
      methods: [],
    };
  },
  mounted() {
    this.methods = METHODS;
  },
};
</script>

<style scoped src="@/assets/styles/client/payment.css"></style>
