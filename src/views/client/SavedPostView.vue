<template>
  <div id="saved" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Tin đã lưu</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Tin đã lưu (2 / 100)</h1>
      <ul class="list-content">
        <saved-post />
      </ul>
    </section>
  </div>
</template>

<script>
import SavedPost from '@/components/client/post/SavedPost';
export default {
  components: {
    SavedPost,
  },
};
</script>

<style scoped src="@/assets/styles/client/saved.css"></style>
