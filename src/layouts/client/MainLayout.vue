<template>
  <NavbarSection />
  <router-view :setChatUser="setChatUser"></router-view>
  <SupportSection />
  <FooterSection />
  <ChatView v-if="user" :receiver="chatUser" :hide="hideChat" @triggerChat="triggerChat" />
</template>

<script>
import NavbarSection from '@/components/client/NavbarSection';
import FooterSection from '@/components/client/FooterSection';
import SupportSection from '@/components/client/SupportSection';
import ChatView from '@/components/client/ChatView';
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
    };
  },
  computed: {
    ...mapState('client', ['user']),
  },
  methods: {
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
