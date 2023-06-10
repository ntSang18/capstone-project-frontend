<template>
  <div class="auth-page">
    <div class="auth-container">
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/login' }">Đăng nhập</el-breadcrumb-item>
        <el-breadcrumb-item>Đăng ký</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>Đăng ký</h2>
      <p>Tạo tài khoản ngay</p>
      <div :class="error ? 'error show' : 'error'">
        {{ error }}
      </div>
      <el-input
        class="inp"
        v-model="info.username"
        type="text"
        placeholder="Nhập tên của bạn"
        clearable
      />
      <el-input
        class="inp"
        v-model="info.email"
        type="email"
        placeholder="Nhập email của bạn"
        clearable
      />
      <el-input
        class="inp"
        v-model="info.phoneNumber"
        type="text"
        placeholder="Nhập SĐT của bạn"
        clearable
      />
      <el-input
        class="inp"
        v-model="info.password"
        type="password"
        placeholder="Tạo mật khẩu có it nhất 8 ký tự"
        show-password
      />
      <button @click="register()">Đăng ký</button>
      <span>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></span>
      <span
        >Quên xác thực tài khoản?
        <router-link to="/reconfirm">Xác thực lại tài khoản</router-link></span
      >
      <div class="line"></div>
      <div class="google-btn">
        <GoogleLogin :callback="signInWithGoogle"> </GoogleLogin>
      </div>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePhoneNumber } from '@/utils/validate';
import { MESSAGES } from '@/common/message';
import AuthService from '@/services/AuthService';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      info: {
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    ...mapActions('client', ['deToken']),
    checkInfo() {
      this.error = '';
      if (!this.info.username) {
        this.error = MESSAGES.ERROR_USERNAME;
        return false;
      } else if (!validateEmail(this.info.email)) {
        this.error = MESSAGES.ERROR_EMAIL;
        return false;
      } else if (!validatePhoneNumber(this.info.phoneNumber)) {
        this.error = MESSAGES.ERROR_PHONE;
        return false;
      } else if (this.info.password.length < 8) {
        this.error = MESSAGES.ERROR_PASSWORD;
        return false;
      }
      return true;
    },
    async register() {
      if (!this.checkInfo()) {
        return;
      }
      const data = {
        username: this.info.username,
        email: this.info.email,
        phone_number: this.info.phoneNumber,
        password: this.info.password,
      };
      const res = await AuthService.register(data);
      if (res.status === 200) {
        this.$store.state.toast.info('Kiểm tra email để xác thực tài khoản!');
      } else {
        this.$store.state.toast.error('Đăng ký thất bại!');
      }
    },
    async signInWithGoogle(response) {
      const data = {
        token: response.credential,
      };
      const res = await AuthService.googleOauth2(data);
      if (res.status === 200) {
        await this.deToken(res.data);
        this.$router.push('/');
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/auth.css"></style>
