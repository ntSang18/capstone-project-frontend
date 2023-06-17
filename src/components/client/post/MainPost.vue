<template>
  <li :class="'post-item ' + className">
    <div class="post-thumb">
      <img :src="post.medias[0].url" @click="viewDetailsPost()" />
      <div class="number-img">
        <span>{{ post.medias.length }} ảnh</span>
      </div>
      <div :class="isSaved ? 'saved active' : 'saved'">
        <i class="bx bxs-heart" @click="savePost()"></i>
      </div>
    </div>
    <div class="post-meta">
      <h3 class="post-title" @click="viewDetailsPost()">
        <div v-if="stars" class="stars-wrapper">
          <div v-for="n in stars" :key="n" class="stars">
            <i class="bx bxs-star"></i>
          </div>
        </div>
        {{ post.title }}
      </h3>
      <div class="row">
        <span class="post-price">{{ toVndString(post.price) }}/tháng</span>
        <span class="post-acreage">{{ post.acreage }} m²</span>
        <span class="post-location">{{ StrAddress() }}</span>
        <span class="post-time">{{ diffTime(post.paid_at) }}</span>
      </div>
      <p class="post-summary">
        {{ post.description }}
      </p>
      <div class="row">
        <div class="post-author">
          <img v-if="post.user.image_url" :src="post.user.image_url" />
          <img v-else src="@/assets/images/default/default-user.png" />
          <span class="author-name">{{ post.user.username }}</span>
        </div>
        <div v-if="post.type === 'VIP_1'" class="btn-group">
          <button class="author-phone-number">{{ post.user.phone_number }}</button>
          <button class="author-chat" @click="chat(post.user)">Nhắn tin</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { TYPE } from '@/common/postTypes.js';
import { toVndString } from '@/utils/numberFormatter';
import { diffTime } from '@/utils/dateFormatter';
import { mapActions, mapState } from 'vuex';
export default {
  props: {
    post: Object,
    setChatUser: Function,
  },
  data() {
    return {
      className: '',
      stars: 5,
      isSaved: false,
    };
  },
  mounted() {
    this.setup();
    this.checkSaved();
  },
  computed: {
    ...mapState('client', ['user', 'savedPosts']),
  },
  methods: {
    ...mapActions('client', ['addSavedPost', 'removeSavedPost']),
    toVndString,
    diffTime,
    viewDetailsPost() {
      this.$router.push(`/post/${this.post.id}`);
    },
    setup() {
      if (this.post.type === TYPE.VIP_1) {
        this.className = 'vip-1';
        this.stars = 5;
      } else if (this.post.type === TYPE.VIP_2) {
        this.className = 'vip-2';
        this.stars = 4;
      } else if (this.post.type === TYPE.VIP_3) {
        this.className = 'vip-3';
        this.stars = 3;
      } else if (this.post.type === TYPE.VIP_4) {
        this.className = 'vip-4';
        this.stars = 2;
      } else {
        this.className = 'normal';
        this.stars = 0;
      }
    },
    StrAddress() {
      return `${this.post.address.province},
      ${this.post.address.district},
      ${this.post.address.ward},
      ${this.post.address.specific_address}`;
    },
    checkSaved() {
      const index = this.savedPosts.findIndex(p => p.id === this.post.id);
      if (index < 0) {
        this.isSaved = false;
      } else {
        this.isSaved = true;
      }
    },
    savePost() {
      if (this.isSaved) {
        this.removeSavedPost(this.post);
        this.isSaved = false;
      } else {
        this.addSavedPost(this.post);
        this.isSaved = true;
      }
    },
    chat(user) {
      if (!this.user) {
        this.$router.push('/login');
      } else {
        if (this.user.id !== user.id) {
          this.setChatUser(user);
        }
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/post.css"></style>
