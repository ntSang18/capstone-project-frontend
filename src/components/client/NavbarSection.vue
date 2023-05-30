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
                <div v-if="user" class="drop-down-header">
                  <div class="user-info">
                    <div class="img-container">
                      <img v-if="user.image" src="user.image" />
                      <img v-else src="@/assets/images/default/user.png" />
                    </div>
                    <div class="info-content">
                      <h2>{{ user.username }}</h2>
                      <span class="info-email">{{ user.email }}</span>
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
                        <strong>{{ user.balance }}</strong>
                        <img src="@/assets/images/icon/gold.png" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="drop-down-header">
                  <div class="btn-wrapper">
                    <router-link to="/login" class="btn-auth">
                      <span>Đăng nhập/Đăng ký</span>
                    </router-link>
                  </div>
                </div>
                <div class="list-action">
                  <div class="title">
                    <span> Quản lý tài khoản</span>
                  </div>
                  <router-link :to="user ? '/info' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/info.png" />
                    <span>Thông tin cá nhân</span>
                  </router-link>
                  <router-link :to="user ? '/manage' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/manage-post.png" />
                    <span>Quản lý tin</span>
                  </router-link>
                  <router-link :to="user ? '/saved' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/post-saved.png" />
                    <span>Tin đã lưu</span>
                  </router-link>
                  <div class="title">
                    <span> Dịch vụ trả phí </span>
                  </div>
                  <router-link :to="user ? '/payment' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/money.png" />
                    <span>Nạp tiền</span>
                  </router-link>
                  <router-link to="/price" class="action-item">
                    <img src="@/assets/images/icon/price-tag.png" />
                    <span>Bảng giá dịch vụ</span>
                  </router-link>
                  <router-link :to="user ? '/payment-history' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/receipt.png" />
                    <span>Lịch sử nạp tiền </span>
                  </router-link>
                  <router-link :to="user ? '/purchase-history' : '/login'" class="action-item">
                    <img src="@/assets/images/icon/payment-history.png" />
                    <span>Lịch sử thanh toán </span>
                  </router-link>
                  <div class="title">
                    <span> Khác </span>
                  </div>
                  <router-link :to="user ? '/account-setting' : '/login'" class="action-item">
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
                  <a class="action-item" @click="logout()">
                    <img src="@/assets/images/icon/logout.png" />
                    <span>Đăng xuất</span>
                  </a>
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
import { mapActions, mapState } from 'vuex';
import AuthService from '@/services/AuthService';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState('client', ['user']),
  },
  methods: {
    ...mapActions('client', ['clearStore']),
    async logout() {
      this.clearStore();
      this.$router.push('/login');
      await AuthService.logout();
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/nav.css"></style>
