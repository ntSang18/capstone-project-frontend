<template>
  <header id="navbar">
    <div class="navbar-container">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" />
        </router-link>
      </div>
      <ul class="nav">
        <li v-if="promotion">
          <router-link to="/promotion">
            <i class="bx bxs-discount"></i>
            <span data-replace="Quản lý tin">Khuyến mãi</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="/analysis">
            <i class="bx bx-bar-chart-alt"></i>
            <span data-replace="Quản lý tin">Biểu đồ giá</span>
          </router-link>
        </li> -->
        <li v-if="user">
          <el-dropdown class="drop-down-btn" trigger="click" max-height="80vh" placement="bottom">
            <a v-if="countNotifyUnread">
              <el-badge :value="countNotifyUnread" :max="9">
                <i class="bx bx-bell"></i>
              </el-badge>
              <span>Thông báo</span>
            </a>
            <a v-else>
              <i class="bx bx-bell"></i>
              <span>Thông báo</span>
            </a>
            <template #dropdown>
              <div class="drop-down notify">
                <div class="drop-down-header">
                  <h2 class="drop-down-title">Thông báo</h2>
                  <div class="drop-down-operations">
                    <button :class="filterStatus ? 'active' : ''" @click="this.filterStatus = true">
                      Tất cả
                    </button>
                    <button
                      :class="filterStatus ? '' : 'active'"
                      @click="this.filterStatus = false"
                    >
                      Chưa đọc
                    </button>
                  </div>
                </div>
                <ul class="list-notify">
                  <li
                    v-for="(item, index) in listNotify"
                    :key="index"
                    class="notify-item"
                    @click="changeStatusNotify(item)"
                  >
                    <div class="item-header">
                      <i
                        v-if="item[1].action === 'confirmed'"
                        class="bx bxs-check-square confirmed"
                      ></i>
                      <i v-else class="bx bxs-x-square"></i>
                      <h3 v-if="item[1].action === 'confirmed'">Tin đã được duyệt</h3>
                      <h3 v-else>Tin đã bị từ chối</h3>
                      <div :class="item[1].status ? 'dot' : 'dot unread'"></div>
                    </div>
                    <p>{{ item[1].message }}</p>
                    <div class="time">
                      <i class="bx bx-time"></i>
                      <span>{{ diffTime(item[1].time) }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </el-dropdown>
        </li>
        <li>
          <el-dropdown class="drop-down-btn" trigger="click" max-height="80vh" placement="bottom">
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
                      <img v-if="user.image_url" :src="user.image_url" />
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
                        <strong>{{ toVnd(user.balance) }}</strong>
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
                  <router-link to="/account-setting" class="action-item">
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
          <router-link to="/create-post">
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
import { toVnd } from '@/utils/numberFormatter';
import { diffTime } from '@/utils/dateFormatter';
import { database, ref, onValue, set, get, child } from '@/services/FirebaseService';
export default {
  props: {
    promotion: Object,
  },
  data() {
    return {
      notifications: [],
      firebaseUser: [],
      countNotifyUnread: 0,
      filterStatus: true,
    };
  },
  computed: {
    ...mapState('client', ['user']),
    listNotify() {
      if (this.filterStatus) {
        return this.notifications.reverse();
      } else {
        return this.notifications.filter(notify => !notify[1].status).reverse();
      }
    },
  },
  mounted() {
    if (this.user) {
      this.getNotifications();
      this.getFirebaseUser();
    }
  },
  methods: {
    ...mapActions('client', ['clearStore']),
    toVnd,
    diffTime,
    async logout() {
      this.setUserOff();
      this.clearStore();
      this.$router.push('/login');
      await AuthService.logout();
    },
    async getFirebaseUser() {
      const snapshot = await get(child(ref(database), 'users'));
      if (snapshot.exists()) {
        const firebaseUsers = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
        this.firebaseUser = firebaseUsers.find(el => el[1].id === this.user.id);
      }
    },
    getNotifications() {
      onValue(ref(database, `notify-user/${this.user.id}`), snapshot => {
        if (snapshot.exists()) {
          this.notifications = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
          this.countNotifyUnread = this.notifications.filter(notify => !notify[1].status).length;
        }
      });
    },
    changeStatusNotify(item) {
      if (!item[1].status) {
        item[1].status = true;
        set(ref(database, `notify-user/${this.user.id}/${item[0]}`), { ...item[1] });
      }
    },
    setUserOff() {
      let now = new Date();
      const obj = {
        availability: false,
        id: this.user.id,
        timeStamp: now.toString(),
      };
      set(ref(database, `users/${this.firebaseUser[0]}`), { ...obj });
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/nav.css"></style>
