<template>
  <div id="saved" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Tin đã lưu</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Tin đã lưu ({{ savedPosts.length }})</h1>
      <ul class="list-content">
        <saved-post v-for="(post, index) in savedPosts" :key="index" :post="post" />
      </ul>
    </section>
  </div>
</template>

<script>
import SavedPost from '@/components/client/post/SavedPost';
import { mapState } from 'vuex';
export default {
  components: {
    SavedPost,
  },
  computed: {
    ...mapState('client', ['savedPosts']),
  },
  methods: {},
};
</script>

<style scoped src="@/assets/styles/client/saved.css"></style>
