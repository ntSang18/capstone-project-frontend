<template>
  <div id="main-layout" :class="theme ? '' : 'dark'">
    <sidebar-section :hide="hideSidebar" :page="page" />
    <section id="content">
      <navbar-section :triggerSidebar="triggerHideSidebar" :triggerTheme="triggerTheme" />
      <router-view :changePage="changePage" />
    </section>
  </div>
</template>

<script>
import SidebarSection from '@/components/admin/SidebarSection';
import NavbarSection from '@/components/admin/NavbarSection';
export default {
  data() {
    return {
      hideSidebar: false,
      theme: true,
      page: 1,
    };
  },
  components: {
    SidebarSection,
    NavbarSection,
  },
  methods: {
    triggerHideSidebar() {
      this.hideSidebar = !this.hideSidebar;
    },
    triggerTheme() {
      this.theme = !this.theme;
    },
    changePage(page) {
      this.page = page;
    },
  },
};
</script>

<style scoped src="@/assets/styles/admin/main_layout.css"></style>
