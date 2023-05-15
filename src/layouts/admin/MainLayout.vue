<template>
  <div id="main-layout" :class="theme ? '' : 'dark'">
    <sidebar-section :hide="hideSidebar" />
    <section id="content">
      <navbar-section :triggerSidebar="triggerHideSidebar" :triggerTheme="triggerTheme" />
      <router-view />
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
  },
};
</script>

<style scoped src="@/assets/styles/admin/main_layout.css"></style>
