<template>
  <li :class="'post-item ' + classNameType + ' aside'">
    <div class="post-thumb">
      <img
        src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2021/03/10/z2372635816674-545794dbbc111cba4b6b0b4ed0d7d184_1615391076.jpg"
      />
    </div>
    <div class="post-meta">
      <h3 class="post-title">
        <div v-if="type != 5" class="stars-wrapper">
          <div class="stars" v-for="n in 6 - type" :key="n">
            <i class="bx bxs-star"></i>
          </div>
        </div>
        PHÒNG TRỌ MỚI RẤT ĐẸP SỐ 373/1/2A ĐƯỜNG LÝ THƯỜNG KIỆT, QUẬN TÂN BÌNh Binh thanh sang sang
        sang sang sang sang sang sang sang sang san sang sang sang sang sang sang sang
      </h3>
      <div class="row">
        <span class="post-price">3.7 triệu/tháng</span>
        <span class="post-time">Hôm nay</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  data() {
    return {
      type: 1,
    };
  },
  computed: {
    classNameType() {
      if (this.type == 1) {
        return 'vip-1';
      } else if (this.type == 2) {
        return 'vip-2';
      } else if (this.type == 3) {
        return 'vip-3';
      } else if (this.type == 4) {
        return 'vip-4';
      } else {
        return 'normal';
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/post.css"></style>
