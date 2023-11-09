<template>
  <li class="post-item saved">
    <div class="post-thumb">
      <img :src="post.medias[0].url" @click="viewDetailsPost()" />
      <div class="number-img">
        <span>{{ post.medias.length }} ảnh</span>
      </div>
    </div>
    <div class="post-meta">
      <h3 class="post-title" @click="viewDetailsPost()">
        {{ post.title }}
      </h3>
      <div class="row">
        <span class="post-price">{{ toVndString(post.price) }}/tháng</span>
        <span class="post-acreage">{{ post.acreage }} m²</span>
        <span class="post-location">{{ strAddress() }}</span>
        <span class="post-time">{{ diffTime(post.paid_at) }}</span>
      </div>
      <p class="post-summary">
        {{ post.description }}
      </p>
      <div class="row">
        <div class="post-author">
          <img v-if="post.user.image_url" :src="post.user.image_url" />
          <img v-else src="@/assets/images/default/default-user.png" />
          <span class="author-name">Nguyen Thanh Sang</span>
        </div>
        <div class="btn-group">
          <button class="author-phone-number">{{ post.user.phone_number }}</button>
          <button class="author-chat">Nhắn tin</button>
        </div>
      </div>
    </div>
    <div class="delete-action">
      <el-popconfirm
        title="Xóa tin này khỏi tin đã lưu"
        confirm-button-text="Đồng ý"
        cancel-button-text="Hủy"
        @confirm="removeSavedPost(post)"
      >
        <template #reference>
          <button class="btn-delete">Xóa tin</button>
        </template>
      </el-popconfirm>
    </div>
  </li>
</template>

<script>
import { toVndString } from '@/utils/numberFormatter';
import { diffTime } from '@/utils/dateFormatter';
import { mapActions } from 'vuex';
export default {
  props: {
    post: Object,
  },
  methods: {
    ...mapActions('client', ['removeSavedPost']),
    toVndString,
    diffTime,
    viewDetailsPost() {
      this.$router.push(`/post/${this.post.id}`);
    },
    strAddress() {
      return `${this.post.address.province},
      ${this.post.address.district},
      ${this.post.address.ward},
      ${this.post.address.specific_address}`;
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/post.css"></style>
