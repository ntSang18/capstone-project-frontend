<template>
  <NavbarSection :promotion="promotion" />
  <router-view :setChatUser="setChatUser" :promotion="promotion"></router-view>
  <SupportSection />
  <FooterSection />
  <ChatView v-if="user" :receiver="chatUser" :hide="hideChat" @triggerChat="triggerChat" />
</template>

<script>
import NavbarSection from '@/components/client/NavbarSection';
import FooterSection from '@/components/client/FooterSection';
import SupportSection from '@/components/client/SupportSection';
import ChatView from '@/components/client/ChatView';
import PromotionService from '@/services/PromotionService';
import { mapState } from 'vuex';

export default {
  components: {
    NavbarSection,
    FooterSection,
    SupportSection,
    ChatView,
  },
  data() {
    return {
      chatUser: null,
      hideChat: true,
      promotion: null,
    };
  },
  computed: {
    ...mapState('client', ['user']),
  },
  mounted() {
    this.getCurrentPromotion();
  },
  methods: {
    async getCurrentPromotion() {
      const res = await PromotionService.getCurrentPromotion();
      if (res.status === 200) {
        this.promotion = res.data;
      }
    },
    setChatUser(user) {
      this.chatUser = user;
      this.triggerChat(false);
    },
    triggerChat(value) {
      this.hideChat = value;
    },
  },
};
</script>
