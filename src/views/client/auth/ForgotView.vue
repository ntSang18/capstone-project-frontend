<template>
  <div class="auth-page">
    <div class="auth-container">
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/login' }">Đăng nhập</el-breadcrumb-item>
        <el-breadcrumb-item>Quên mật khẩu</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>Quên mật khẩu</h2>
      <p>Nhập thông tin email để đặt lại mật khẩu</p>
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
      <button @click="forgot()">Đồng ý</button>
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
    async forgot() {
      if (!this.checkInfo()) {
        return;
      }
      const data = {
        email: this.email,
      };
      const res = await AuthService.forgot(data);
      if (res.status === 200) {
        this.$store.state.toast.info('Kiểm tra email để đặt lại mật khẩu!');
      } else {
        this.$store.state.toast.error('Email không chính xác!');
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/auth.css"></style>
