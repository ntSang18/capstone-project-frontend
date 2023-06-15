<template>
  <nav id="navbar">
    <i class="bx bx-menu" @click="triggerSidebar"></i>
    <div class="left">
      <input type="checkbox" id="switch-mode" hidden @change="triggerTheme" />
      <label for="switch-mode" class="switch-mode"></label>
      <el-dropdown class="drop-down-btn" trigger="click" max-height="80vh" placement="bottom">
        <a v-if="countNotifyUnread" class="notification">
          <el-badge :value="countNotifyUnread" :max="9">
            <i class="bx bxs-bell"></i>
          </el-badge>
        </a>
        <a v-else class="notification">
          <i class="bx bxs-bell"></i>
        </a>
        <template #dropdown>
          <div class="drop-down">
            <div class="drop-down-header">
              <h2 class="drop-down-title">Thông báo</h2>
              <div class="drop-down-operations">
                <button :class="filterStatus ? 'active' : ''" @click="this.filterStatus = true">
                  Tất cả
                </button>
                <button :class="filterStatus ? '' : 'active'" @click="this.filterStatus = false">
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
                  <i class="bx bxs-plus-square create"></i>
                  <h3>Đăng tin mới</h3>
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
      <router-link to="/" class="profile">
        <img src="@/assets/images/default/user.png" />
      </router-link>
    </div>
  </nav>
</template>

<script>
import { database, ref, onValue, set } from '@/services/FirebaseService';
import { diffTime } from '@/utils/dateFormatter';
export default {
  props: {
    triggerSidebar: Function,
    triggerTheme: Function,
  },
  data() {
    return {
      notifications: [],
      countNotifyUnread: 0,
      filterStatus: true,
    };
  },
  computed: {
    listNotify() {
      if (this.filterStatus) {
        return this.notifications.reverse();
      } else {
        return this.notifications.filter(notify => !notify[1].status).reverse();
      }
    },
  },
  mounted() {
    this.getNotifications();
  },
  methods: {
    diffTime,
    getNotifications() {
      onValue(ref(database, 'notify-admin'), snapshot => {
        if (snapshot.exists()) {
          this.notifications = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
          this.countNotifyUnread = this.notifications.filter(notify => !notify[1].status).length;
        }
      });
    },
    async changeStatusNotify(item) {
      if (!item[1].status) {
        item[1].status = true;
        console.log(item[0]);
        console.log({ ...item[1] });
        set(ref(database, `notify-admin/${item[0]}`), { ...item[1] });
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/admin/navbar.css"></style>
