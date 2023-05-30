<template>
  <div id="auth">
    <div class="form">
      <h2>Đăng nhập</h2>
      <input type="email" placeholder="Địa chỉ email" v-model="info.email" />
      <input type="password" placeholder="Mật khẩu" v-model="info.password" />
      <button @click="login()">Đăng nhập</button>
      <router-link to="/admin/forgot"> Quên mật khẩu? </router-link>
    </div>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate';
import { MESSAGES } from '@/common/message';
import AuthService from '@/services/AuthService';
import UserService from '@/services/UserService';
import { mapActions } from 'vuex';
import { ROLES } from '@/common/roles';
export default {
  data() {
    return {
      info: {
        email: '',
        password: '',
        role: ROLES.ADMIN,
      },
    };
  },
  methods: {
    ...mapActions('admin', ['setToken', 'setUser']),
    checkInfo() {
      if (!validateEmail(this.info.email)) {
        this.$store.state.toast.info(MESSAGES.ERROR_EMAIL);
        return false;
      } else if (this.info.password.length < 8) {
        this.$store.state.toast.info(MESSAGES.ERROR_PASSWORD);
        return false;
      }
      return true;
    },
    async login() {
      if (!this.checkInfo()) {
        return;
      }
      const res = await AuthService.login(this.info);
      if (res.status === 200) {
        await this.setToken(res.data);
        const response = await UserService.getCurrentUser();
        if (response.status === 200) {
          this.setUser(response.data);
        }
        this.$router.push('/admin');
      } else {
        this.$store.state.toast.error('Email hoặc mật khẩu chưa chính xác!');
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/auth.css"></style>
