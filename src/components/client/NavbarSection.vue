<template>
  <header id="navbar">
    <div class="navbar-container">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" />
        </router-link>
      </div>
      <ul class="nav">
        <li>
          <router-link to="/">
            <i class="bx bx-bar-chart-alt"></i>
            <span data-replace="Quản lý tin">Biểu đồ giá</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <i class="bx bx-chat"></i>
            <span>Chat</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <i class="bx bx-bell"></i>
            <span>Thông báo</span>
          </router-link>
        </li>
        <li>
          <el-dropdown trigger="click" max-height="80vh" placement="bottom-end">
            <a>
              <i class="bx bx-user-circle"></i>
              <span>Tài khoản</span>
              <i class="bx bxs-down-arrow down"></i>
            </a>
            <template #dropdown>
              <div class="drop-down">
                <div class="user-info">
                  <div class="img-container">
                    <img src="@/assets/images/default/user.png" alt="" />
                  </div>
                  <div class="info-content">
                    <h2>Nguyen Thanh Sang</h2>
                    <span class="info-email">thanhsang6325@gmail.com</span>
                    <div class="separate"></div>
                    <div class="info-follow">
                      <span>0 Người theo dõi</span>
                      <div class="separate"></div>
                      <span>0 Người theo dõi</span>
                    </div>
                  </div>
                </div>
                <div class="user-balance">
                  <div class="container">
                    <h4>Số dư</h4>
                    <div class="balance">
                      <strong>0</strong>
                      <img src="@/assets/images/icon/gold.png" />
                    </div>
                  </div>
                </div>
                <div class="list-action">
                  <div class="title">
                    <span> Quản lý tài khoản</span>
                  </div>
                  <router-link to="/info" class="action-item">
                    <img src="@/assets/images/icon/info.png" />
                    <span>Thông tin cá nhân</span>
                  </router-link>
                  <router-link to="/manage" class="action-item">
                    <img src="@/assets/images/icon/manage-post.png" />
                    <span>Quản lý tin</span>
                  </router-link>
                  <router-link to="/saved" class="action-item">
                    <img src="@/assets/images/icon/post-saved.png" />
                    <span>Tin đã lưu</span>
                  </router-link>
                  <div class="title">
                    <span> Dịch vụ trả phí </span>
                  </div>
                  <router-link to="/payment" class="action-item">
                    <img src="@/assets/images/icon/money.png" />
                    <span>Nạp tiền</span>
                  </router-link>
                  <router-link to="/price" class="action-item">
                    <img src="@/assets/images/icon/price-tag.png" />
                    <span>Bảng giá dịch vụ</span>
                  </router-link>
                  <router-link to="/payment-history" class="action-item">
                    <img src="@/assets/images/icon/receipt.png" />
                    <span>Lịch sử nạp tiền </span>
                  </router-link>
                  <router-link to="/purchase-history" class="action-item">
                    <img src="@/assets/images/icon/payment-history.png" />
                    <span>Lịch sử thanh toán </span>
                  </router-link>
                  <div class="title">
                    <span> Khác </span>
                  </div>
                  <router-link to="/" class="action-item">
                    <img src="@/assets/images/icon/setting.png" />
                    <span>Cài đặt tài khoản </span>
                  </router-link>
                  <router-link to="/" class="action-item">
                    <img src="@/assets/images/icon/help.png" />
                    <span> Hướng dẫn </span>
                  </router-link>
                  <router-link to="/" class="action-item">
                    <img src="@/assets/images/icon/feedback.png" />
                    <span>Đóng góp ý kiến</span>
                  </router-link>
                  <router-link to="/" class="action-item">
                    <img src="@/assets/images/icon/logout.png" />
                    <span>Đăng xuất</span>
                  </router-link>
                </div>
              </div>
            </template>
          </el-dropdown>
        </li>
        <li>
          <router-link to="/">
            <button>
              <i class="bx bx-edit"></i>
              <span>Đăng tin</span>
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped src="@/assets/styles/client/nav.css"></style>
