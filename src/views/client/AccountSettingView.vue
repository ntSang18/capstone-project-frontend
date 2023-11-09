<template>
  <div id="account-setting" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Cài đặt tài khoản</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Cài đặt tài khoản</h1>
      <div class="content-wrapper">
        <div class="left">
          <div class="password">
            <h2 class="sub-title">Thay đổi mật khẩu</h2>
            <div class="form-change-password">
              <div :class="error ? 'error show' : 'error'">
                {{ error }}
              </div>
              <div class="inp-group">
                <label for="current-password">Mật khẩu hiện tại</label>
                <el-input
                  id="current-password"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  v-model="info.currentPassword"
                  show-password
                />
              </div>
              <div class="inp-group">
                <label for="new-password">Mật khẩu mới</label>
                <el-input
                  id="new-password"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  v-model="info.newPassword"
                  show-password
                />
              </div>
              <div class="inp-group">
                <label for="repeat-password">Xác nhận mật khẩu mới</label>
                <el-input
                  id="repeat-password"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  v-model="info.repeatNewPassword"
                  show-password
                />
              </div>
              <button class="btn-change-password" @click="changePassword()">
                <span>Đổi mật khẩu</span>
              </button>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="setting">
            <h2 class="sub-title">Cài đặt</h2>
            <div class="setting-item">
              <div class="item-left"><i class="bx bxs-moon"></i> <span>Chế độ tối</span></div>
              <el-switch v-model="night" size="small" class="switch" />
            </div>
            <div class="setting-item">
              <div class="item-left">
                <i class="bx bx-notification-off"></i> <span>Trạng thái hoạt động</span>
              </div>
              <el-switch v-model="status" size="small" class="switch" />
            </div>
            <button class="btn-delete-account">Xóa tài khoản</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
import { MESSAGES } from '@/common/message';
import { ElLoading } from 'element-plus';
export default {
  data() {
    return {
      info: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      },
      night: false,
      status: false,
      error: '',
      dataReady: false,
    };
  },
  methods: {
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    checkFormInfo() {
      this.error = '';
      if (this.info.newPassword.length < 8) {
        this.error = MESSAGES.ERROR_PASSWORD;
        return false;
      } else if (this.info.repeatNewPassword !== this.info.newPassword) {
        this.error = MESSAGES.ERROR_CONFIRM_PASSWORD;
        return false;
      }
      return true;
    },
    clearForm() {
      this.info.currentPassword = '';
      this.info.newPassword = '';
      this.info.repeatNewPassword = '';
    },
    async changePassword() {
      if (!this.checkFormInfo()) {
        return;
      }
      this.loading();
      this.dataReady = false;
      const obj = {
        current_password: this.info.currentPassword,
        new_password: this.info.newPassword,
      };
      const res = await AuthService.change(obj);
      if (res.status === 200) {
        this.$store.state.toast.success('Thay đổi mật khẩu thannhf công!');
        this.clearForm();
        this.dataReady = true;
      } else {
        this.$store.state.toast.error('Thay đổi mật khẩu thất bại!');
        this.dataReady = true;
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

<style scoped src="@/assets/styles/client/account.css"></style>
