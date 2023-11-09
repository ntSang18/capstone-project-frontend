<template>
  <el-dialog
    id="create-user-dialog"
    class="dialog-component"
    v-model="modelDialogVisible"
    :show-close="false"
    width="40%"
  >
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Tạo tài khoản mới</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div :class="error ? 'error show' : 'error'">
        <span>{{ error }}</span>
      </div>
      <div class="inp-group">
        <label for="email">Email</label>
        <el-input
          id="email"
          type="email"
          v-model="info.email"
          placeholder="Địa chỉ email"
          clearable
        />
      </div>
      <div class="inp-group">
        <label for="phone">Số điện thoại</label>
        <el-input id="phone" v-model="info.phoneNumber" placeholder="Số điện thoại" clearable />
      </div>
      <div class="inp-group">
        <label for="username">Tên người dùng</label>
        <el-input id="username" v-model="info.username" placeholder="Tên người dùng" clearable />
      </div>
      <div class="inp-group">
        <label for="role">Role</label>
        <el-select id="role" v-model="info.role" placeholder="Select">
          <el-option v-for="item in roles" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="inp-group">
        <label for="password">Mật khẩu</label>
        <el-input
          id="password"
          type="password"
          v-model="info.password"
          placeholder="Nhập mật khẩu có ít nhất 8 ký tự"
          show-password
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button type="primary" @click="createUser()"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ROLES } from '@/common/roles';
import { MESSAGES } from '@/common/message';
import { validateEmail, validatePhoneNumber } from '@/utils/validate';
import UserService from '@/services/UserService';
export default {
  props: {
    dialogVisible: Boolean,
    getUsers: Function,
  },
  data() {
    return {
      info: {
        email: '',
        phoneNumber: '',
        username: '',
        role: '',
        password: '',
      },
      error: '',
      roles: [],
    };
  },
  mounted() {
    this.initRoles();
  },
  computed: {
    modelDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(value) {
        this.clearDialog();
        this.$emit('triggerDialog', value);
      },
    },
  },
  methods: {
    initRoles() {
      this.roles = [ROLES.USER, ROLES.ADMIN];
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
    },
    checkInfo() {
      this.error = '';
      if (!validateEmail(this.info.email)) {
        this.error = MESSAGES.ERROR_EMAIL;
        return false;
      } else if (!validatePhoneNumber(this.info.phoneNumber)) {
        this.error = MESSAGES.ERROR_PHONE;
        return false;
      } else if (this.info.username.trim().length === 0) {
        this.error = MESSAGES.ERROR_USERNAME;
        return false;
      } else if (this.info.role.trim().length === 0) {
        this.error = MESSAGES.ERROR_ROLE;
        return false;
      } else if (this.info.password.trim().length < 8) {
        this.error = MESSAGES.ERROR_PASSWORD;
        return false;
      }
      return true;
    },
    clearDialog() {
      for (const key in this.info) {
        this.info[key] = '';
      }
    },
    async createUser() {
      if (!this.checkInfo()) {
        return;
      }
      const obj = {
        email: this.info.email,
        username: this.info.username,
        phone_number: this.info.phoneNumber,
        role: this.info.role,
        password: this.info.password,
      };
      const res = await UserService.createUser(obj);
      if (res.status === 200) {
        this.getUsers();
        this.$store.state.toast.success('Tạo người dùng thành công!');
        this.closeDialog();
      } else if (res.response.status === 406) {
        this.$store.state.toast.error('Email đã được sử dụng!');
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
