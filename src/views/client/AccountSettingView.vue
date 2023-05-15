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
            <form class="form-change-password">
              <div class="inp-group">
                <label for="current-password">Mật khẩu hiện tại</label>
                <el-input
                  id="current-password"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  show-password
                />
              </div>
              <div class="inp-group">
                <label for="new-password">Mật khẩu mới</label>
                <el-input
                  id="new-password"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  show-password
                />
              </div>
              <div class="inp-group">
                <label for="repeat-password">Xác nhận mật khẩu mới</label>
                <el-input
                  id="repeat-password"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  show-password
                />
              </div>
              <button class="btn-change-password"><span>Đổi mật khẩu</span></button>
            </form>
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
              <el-switch v-model="night" size="small" class="switch" />
            </div>
            <button class="btn-delete-account">Xóa tài khoản</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      night: false,
    };
  },
};
</script>

<style scoped src="@/assets/styles/client/account.css"></style>
