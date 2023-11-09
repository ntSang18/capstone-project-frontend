<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>Đặt lại mật khẩu</h2>
      <div :class="error ? 'error show' : 'error'">
        {{ error }}
      </div>
      <el-input
        class="inp"
        v-model="password"
        type="password"
        placeholder="Tạo mật khẩu mới có ít nhất 8 ký tự"
        show-password
      />
      <el-input
        class="inp"
        v-model="confirmPassword"
        type="password"
        placeholder="Nhập lại mật khẩu"
        show-password
      />
      <button @click="reconfirm()">Đặt lại mật khẩu</button>
    </div>
  </div>
</template>

<script>
import { MESSAGES } from '@/common/message';
import AuthService from '@/services/AuthService';
export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      error: '',
    };
  },
  methods: {
    checkInfo() {
      this.error = '';
      if (this.password.length < 8) {
        this.error = MESSAGES.ERROR_PASSWORD;
        return false;
      } else if (this.password !== this.confirmPassword) {
        this.error = MESSAGES.ERROR_CONFIRM_PASSWORD;
        return false;
      }
      return true;
    },
    async reconfirm() {
      if (!this.checkInfo()) {
        return;
      }
      const data = {
        token: this.$route.params.token,
        password: this.password,
        confirm_password: this.confirmPassword,
      };
      const res = await AuthService.reset(data);
      if (res.status === 200) {
        this.$store.state.toast.success('Đổi mật khẩu thành công!');
      } else {
        this.$store.state.toast.eror('Đổi mật khẩu thất bại!');
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/auth.css"></style>
