<template>
  <div class="auth-page">
    <div class="auth-container">
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/login' }">Đăng nhập</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/register' }">Đăng ký</el-breadcrumb-item>
        <el-breadcrumb-item>Xác thực</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>Xác thực lại tài khoản</h2>
      <p>Nhập thông email để xác thực tài khoản</p>
      <div :class="error ? 'error show' : 'error'">
        {{ error }}
      </div>
      <el-input
        class="inp"
        v-model="email"
        type="email"
        placeholder="Nhập email của bạn"
        clearable
      />
      <button @click="reconfirm()">Đồng ý</button>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate';
import { MESSAGES } from '@/common/message';
import AuthService from '@/services/AuthService';
export default {
  data() {
    return {
      email: '',
      error: '',
    };
  },
  methods: {
    checkInfo() {
      this.error = '';
      if (!validateEmail(this.email)) {
        this.error = MESSAGES.ERROR_EMAIL;
        return false;
      }
      return true;
    },
    async reconfirm() {
      if (!this.checkInfo()) {
        return;
      }
      const data = {
        email: this.email,
      };
      const res = await AuthService.reconfirm(data);
      if (res.status === 200) {
        this.$store.state.toast.info('Kiểm tra email để xác thực tài khoản');
      } else {
        this.$store.state.toast.error(res.err.response.data.message);
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/auth.css"></style>
