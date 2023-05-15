<template>
  <li :class="'post-item ' + classNameType">
    <div class="post-thumb">
      <img
        src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2021/03/10/z2372635816674-545794dbbc111cba4b6b0b4ed0d7d184_1615391076.jpg"
      />
      <div class="number-img">
        <span>7 ảnh</span>
      </div>
      <div class="saved"><i class="bx bxs-heart"></i></div>
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
        <span class="post-acreage">25 m²</span>
        <span class="post-location">Quận Gò Vấp, Hồ Chí Minh sang sang sang sang</span>
        <span class="post-time">Hôm nay</span>
      </div>
      <p class="post-summary">
        Khai trương tòa nhà sleepbox ngay tại chợ Gò Vấp, gần trường DH Công Nghiệp HCMVới vị trí
        này, Chỉ cần một vài bước chân, bạn có thể đến trường sang sang sang sang sang sang sang
        sang sang sang sang sang sang sang sang sang sang sang sang sang sang sang sang sangsang
        sang sang sang sang sang sang sang
      </p>
      <div class="row">
        <div class="post-author">
          <img
            src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/05/23/anh-2-1-590x308_1653278194.jpg"
          />
          <span class="author-name">Nguyen Thanh Sang</span>
        </div>
        <div v-if="type == 1" class="btn-group">
          <button class="author-phone-number">0777908037</button>
          <button class="author-chat">Nhắn tin</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    type: Number,
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
