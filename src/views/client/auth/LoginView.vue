<template>
  <div class="auth-page">
    <div class="auth-container login">
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item>Đăng nhập</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>Đăng nhập</h2>
      <p>Chào mừng bạn quay trở lại</p>
      <div :class="error ? 'error show' : 'error'">
        {{ error }}
      </div>
      <el-input
        class="inp"
        v-model="info.email"
        type="email"
        placeholder="Nhập email của bạn"
        clearable
      />
      <el-input
        class="inp"
        v-model="info.password"
        type="password"
        placeholder="Nhập mật khẩu của bạn"
        show-password
      />
      <router-link to="/forgot">Quên mật khẩu?</router-link>
      <button @click="login()">Đăng nhập</button>
      <span>Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link></span>
      <div class="line"></div>
      <div class="google-btn">
        <GoogleLogin :callback="signInWithGoogle"></GoogleLogin>
      </div>
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
import { ElLoading } from 'element-plus';
import { database, ref, set, push, get, child } from '@/services/FirebaseService';
export default {
  data() {
    return {
      info: {
        email: '',
        password: '',
        role: ROLES.USER,
      },
      firebaseUsers: [],
      error: '',
      dataReady: false,
    };
  },
  mounted() {
    this.getFirebaseUsers();
  },
  methods: {
    ...mapActions('client', ['setToken', 'setUser']),
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    checkInfo() {
      this.error = '';
      if (!validateEmail(this.info.email)) {
        this.error = MESSAGES.ERROR_EMAIL;
        return false;
      } else if (this.info.password.length < 8) {
        this.error = MESSAGES.ERROR_PASSWORD;
        return false;
      }
      return true;
    },
    async login() {
      if (!this.checkInfo()) {
        return;
      }
      this.loading();
      this.dataReady = false;
      const res = await AuthService.login(this.info);
      if (res.status === 200) {
        await this.setToken(res.data);
        const response = await UserService.getCurrentUser();
        if (response.status === 200) {
          this.setUser(response.data);
          this.triggerOnlineUser(response.data);
        }
        this.dataReady = true;
        this.$router.push('/');
      } else if (res.response.status === 423) {
        this.$store.state.toast.error('Tài khoản đã bị khóa!');
        this.dataReady = true;
      } else {
        this.$store.state.toast.error('Email hoặc mật khẩu chưa chính xác!');
        this.dataReady = true;
      }
    },
    async signInWithGoogle(response) {
      this.loading();
      this.dataReady = false;
      const data = {
        token: response.credential,
      };
      const res = await AuthService.googleOauth2(data);
      if (res.status === 200) {
        await this.setToken(res.data);
        const response = await UserService.getCurrentUser();
        if (response.status === 200) {
          this.setUser(response.data);
          this.triggerOnlineUser(response.data);
        }
        this.dataReady = true;
        this.$router.push('/');
      } else if (res.response.status === 423) {
        this.$store.state.toast.error('Tài khoản đã bị khóa!');
        this.dataReady = true;
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
        this.dataReady = true;
      }
    },
    async getFirebaseUsers() {
      const snapshot = await get(child(ref(database), 'users'));
      if (snapshot.exists()) {
        this.firebaseUsers = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
      }
    },
    pushFirebaseUser(id) {
      let now = new Date();
      const obj = {
        availability: true,
        id: id,
        timeStamp: now.toString(),
      };
      push(ref(database, 'users'), { ...obj });
    },
    setFirebaseUser(id, key) {
      let now = new Date();
      const obj = {
        availability: true,
        id: id,
        timeStamp: now.toString(),
      };
      set(ref(database, `users/${key}`), { ...obj });
    },
    triggerOnlineUser(user) {
      const firebaseUser = this.firebaseUsers.find(el => el[1].id === user.id);
      if (firebaseUser) {
        this.setFirebaseUser(user.id, firebaseUser[0]);
        return;
      } else {
        this.pushFirebaseUser(user.id);
        return;
      }
    },
  },
  watch: {
    dataReady() {
      if (this.dataReady) {
        this.loading();
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/auth.css"></style>
