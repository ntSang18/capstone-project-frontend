<template>
  <section id="sidebar" :class="hide ? 'hide' : ''">
    <router-link to="/admin" class="brand">
      <i class="bx bxs-smile"></i>
      <span class="text">Admin</span>
    </router-link>
    <ul class="side-menu top ps-0">
      <li :class="page === 1 ? 'active' : ''">
        <router-link to="/admin">
          <i class="bx bxs-dashboard"></i>
          <span class="text">Bảng điều khiển</span>
        </router-link>
      </li>
      <li :class="page === 2 ? 'active' : ''">
        <router-link to="/admin/manage-post">
          <i class="bx bxs-notepad"></i>
          <span class="text">Tin đăng</span>
        </router-link>
      </li>
      <li :class="page === 3 ? 'active' : ''">
        <router-link to="/admin/manage-account">
          <i class="bx bxs-group"></i>
          <span class="text">Người dùng</span>
        </router-link>
      </li>
      <li :class="page === 4 ? 'active' : ''">
        <router-link to="/admin/manage-package">
          <i class="bx bxs-purchase-tag"></i>
          <span class="text">Gói đăng tin</span>
        </router-link>
      </li>
      <li :class="page === 5 ? 'active' : ''">
        <router-link to="/admin/manage-promotion">
          <i class="bx bxs-discount"></i>
          <span class="text">Khuyến mãi</span>
        </router-link>
      </li>
      <li :class="page === 6 ? 'active' : ''">
        <router-link to="/admin/income">
          <i class="bx bx-money"></i>
          <span class="text">Doanh thu</span>
        </router-link>
      </li>
    </ul>
    <ul class="side-menu ps-0">
      <!-- <li>
        <a router-link to="/">
          <i class="bx bxs-cog"></i>
          <span class="text">Settings</span>
        </a>
      </li> -->
      <li>
        <a class="logout" @click="logout()">
          <i class="bx bxs-log-out-circle"></i>
          <span class="text">Logout</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import AuthService from '@/services/AuthService';
export default {
  props: {
    hide: Boolean,
    page: Number,
  },
  methods: {
    ...mapActions('admin', ['clearStore']),
    async logout() {
      this.clearStore();
      this.$router.push('/admin/login');
      await AuthService.logout();
    },
  },
};
</script>

<style scoped src="@/assets/styles/admin/sidebar.css"></style>
