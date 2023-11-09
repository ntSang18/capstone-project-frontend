<template>
  <div id="notify">
    <div class="notify-container">
      <img src="@/assets/images/icon/success.png" />
      <h2>Đăng tin thành công</h2>
      <p>
        Bài đăng của bạn đang đợi kiểm duyệt. Vui lòng kiểm tra mục
        <strong>quản lý tin</strong> để tiến hành thanh toán và hiển thị bài đăng
      </p>
      <div class="btn-group">
        <router-link to="/">
          <button>Trang chủ</button>
        </router-link>
        <router-link to="/manage">
          <button>Quản lý tin</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style src="@/assets/styles/client/notify.css"></style>
