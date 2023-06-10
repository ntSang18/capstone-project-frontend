<template>
  <li :class="`post-item ${className} aside`">
    <div class="post-thumb">
      <img :src="post.medias[0].url" @click="viewDetailsPost()" />
    </div>
    <div class="post-meta">
      <h3 class="post-title" @click="viewDetailsPost()">
        <div v-if="stars" class="stars-wrapper">
          <div class="stars" v-for="n in stars" :key="n">
            <i class="bx bxs-star"></i>
          </div>
        </div>
        {{ post.title }}
      </h3>
      <div class="row">
        <span class="post-price">{{ toVndString(post.price) }}/tháng</span>
        <span class="post-time">{{ diffTime(post.paid_at) }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import { TYPE } from '@/common/postTypes.js';
import { toVndString } from '@/utils/numberFormatter';
import { diffTime } from '@/utils/dateFormatter';
export default {
  props: {
    post: Object,
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
  },
  methods: {
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
  },
};
</script>

<style scoped src="@/assets/styles/client/post.css"></style>
