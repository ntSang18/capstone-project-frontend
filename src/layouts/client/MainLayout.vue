<template>
  <NavbarSection />
  <router-view></router-view>
  <SupportSection />
  <FooterSection />
</template>

<script>
import NavbarSection from '@/components/client/NavbarSection';
import FooterSection from '@/components/client/FooterSection';
import SupportSection from '@/components/client/SupportSection.vue';

export default {
  components: {
    NavbarSection,
    FooterSection,
    SupportSection,
  },
};
</script>
