<template>
  <el-dialog
    id="view-user-dialog"
    class="dialog-component"
    v-model="modelDialogVisible"
    :show-close="false"
    top="5vh"
    width="60%"
  >
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Tài khoản người dùng #{{ user.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div class="avatar">
        <img v-if="user.image_url" :src="user.image_url" />
        <img v-else src="@/assets/images/default/default-user.png" />
      </div>
      <h2 class="username">{{ user.username }}</h2>
      <div class="balance">
        <span
          >Số dư: <strong>{{ toVnd(user.balance) }}</strong></span
        >
      </div>
      <div class="info-container">
        <div class="general-info">
          <h2>Thông tin chung</h2>
          <table>
            <tbody>
              <tr>
                <td class="name">Email:</td>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <td class="name">Số điện thoại:</td>
                <td>{{ user.phone_number }}</td>
              </tr>
              <tr>
                <td class="name">Liên kết facebook:</td>
                <td>{{ user.facebook }}</td>
              </tr>
              <tr>
                <td class="name">Role:</td>
                <td>{{ user.role }}</td>
              </tr>
              <tr>
                <td class="name">Thời gian tạo:</td>
                <td>{{ timeFormatter(user.created_at) }}</td>
              </tr>
              <tr>
                <td class="name">Thời gian cập nhật:</td>
                <td>{{ timeFormatter(user.updated_at) }}</td>
              </tr>
              <tr>
                <td class="name">Tài khoản bị khóa:</td>
                <td>{{ checkLocked(user.locked) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="address-info">
          <h2>Thông tin địa chỉ</h2>
          <table>
            <tbody>
              <tr>
                <td class="name">Tỉnh, thành phố:</td>
                <td>{{ user.province }}</td>
              </tr>
              <tr>
                <td class="name">Quận, huyện:</td>
                <td>{{ user.district }}</td>
              </tr>
              <tr>
                <td class="name">Xã, thị trấn:</td>
                <td>{{ user.ward }}</td>
              </tr>
              <tr>
                <td class="name">Địa chỉ cụ thể:</td>
                <td>{{ user.specific_address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Đóng</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { toVnd } from '@/utils/numberFormatter';
export default {
  props: {
    dialogVisible: Boolean,
    user: Object,
  },
  computed: {
    modelDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(value) {
        this.$emit('triggerDialog', value);
      },
    },
  },
  methods: {
    toVnd,
    closeDialog() {
      this.modelDialogVisible = false;
    },
    timeFormatter(datetime) {
      var date = datetime.split('T')[0];
      var rawTime = datetime.split('T')[1];
      var time = rawTime.split('.')[0];
      return date + ' ' + time;
    },
    checkLocked(locked) {
      return locked ? 'Tài khoản đã bị khóa' : 'Tài khoản đang kích hoạt';
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
