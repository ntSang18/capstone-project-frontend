<template>
  <section id="sidebar" :class="hide ? 'hide' : ''">
    <router-link to="/admin" class="brand">
      <i class="bx bxs-smile"></i>
      <span class="text">Admin</span>
    </router-link>
    <ul class="side-menu top ps-0">
      <li :class="active === 1 ? 'active' : ''" @click="triggerActive(1)">
        <router-link to="/admin">
          <i class="bx bxs-dashboard"></i>
          <span class="text">Bảng điều khiển</span>
        </router-link>
      </li>
      <li :class="active === 2 ? 'active' : ''" @click="triggerActive(2)">
        <router-link to="/admin/manage-post">
          <i class="bx bxs-notepad"></i>
          <span class="text">Tin đăng</span>
        </router-link>
      </li>
      <li :class="active === 3 ? 'active' : ''" @click="triggerActive(3)">
        <router-link to="/admin/manage-account">
          <i class="bx bxs-group"></i>
          <span class="text">Người dùng</span>
        </router-link>
      </li>
      <li :class="active === 4 ? 'active' : ''" @click="triggerActive(4)">
        <router-link to="/admin/manage-package">
          <i class="bx bxs-purchase-tag"></i>
          <span class="text">Gói đăng tin</span>
        </router-link>
      </li>
      <li :class="active === 5 ? 'active' : ''" @click="triggerActive(5)">
        <router-link to="/admin/income">
          <i class="bx bx-money"></i>
          <span class="text">Doanh thu</span>
        </router-link>
      </li>
    </ul>
    <ul class="side-menu ps-0">
      <li>
        <a router-link to="/">
          <i class="bx bxs-cog"></i>
          <span class="text">Settings</span>
        </a>
      </li>
      <li>
        <a class="logout">
          <i class="bx bxs-log-out-circle"></i>
          <span class="text">Logout</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    hide: Boolean,
  },
  data() {
    return {
      active: 1,
    };
  },
  methods: {
    triggerActive(index) {
      this.active = index;
    },
  },
};
</script>

<style scoped src="@/assets/styles/admin/sidebar.css"></style>
