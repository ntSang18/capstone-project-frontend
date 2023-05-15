<template>
  <nav id="navbar">
    <i class="bx bx-menu" @click="triggerSidebar"></i>
    <a href="#" class="nav-link">Categories</a>
    <form action="#">
      <div class="form-input">
        <input type="search" placeholder="Search..." />
        <button type="submit" class="search-btn">
          <i class="bx bx-search"></i>
        </button>
      </div>
    </form>
    <input type="checkbox" id="switch-mode" hidden @change="triggerTheme" />
    <label for="switch-mode" class="switch-mode"></label> `
    <a href="#" class="notification">
      <i class="bx bxs-bell"></i>
      <span class="num">8</span>
    </a>
    <router-link to="/" class="profile">
      <img src="@/assets/images/default/user.png" />
    </router-link>
  </nav>
</template>

<script>
export default {
  props: {
    triggerSidebar: Function,
    triggerTheme: Function,
  },
};
</script>

<style scoped src="@/assets/styles/admin/navbar.css"></style>
