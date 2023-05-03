<template>
  <NavbarSection></NavbarSection>
  <router-view></router-view>
  <FooterSection></FooterSection>
</template>

<script>
import NavbarSection from '@/components/client/NavbarSection';
import FooterSection from '@/components/client/FooterSection';

export default {
  components: {
    NavbarSection,
    FooterSection,
  },
};
</script>
