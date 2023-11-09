<template>
  <div id="promotion" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Khuyến mãi</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section v-if="promotion" id="content" class="section">
      <h1 class="title">Chương trình khuyến mãi</h1>
      <p class="summary">
        Với muốn bày tỏ lòng tri ân đặc biệt đến khách hàng gắn bó lâu năm cũng như chào mừng các
        khách hàng mới. Chúng tôi tổ chức chương trình khuyến mãi hấp dẫn với nhiều ưu đãi đặc biệt.
        Hãy ghé thăm <strong>hoomseek</strong> thường xuyên để nhận những ưu đãi tuyệt vời, khuyến
        mãi này là lời cảm ơn chân thành dành cho sự ủng hộ của bạn. Cảm ơn vì đã tin tưởng!
      </p>
      <div class="promotion-detail">
        <h2 class="name">{{ promotion.name }}</h2>
        <div class="time">
          <i class="bx bx-time"></i>
          <p>
            Thời gian áp dụng:
            <strong>
              {{ dateTimeFormatter(promotion.start_at) }}
            </strong>
            đến
            <strong>
              {{ dateTimeFormatter(promotion.end_at) }}
            </strong>
          </p>
        </div>
        <ul class="childs">
          <li v-for="child in promotion.childs" :key="child.id" class="child-item">
            <span v-if="child.end_range !== 999999999"
              >Khách hàng nạp tiền từ <strong>{{ toVnd(child.start_range) }}</strong> đến
              <strong>dưới {{ toVnd(child.end_range) }}</strong
              >: <strong>khuyến mãi thêm {{ child.percent }}%</strong> vào tài khoản</span
            >
            <span v-else
              >Khách hàng nạp tiền trên <strong>{{ toVnd(child.start_range) }}</strong
              >: <strong>khuyến mãi thêm {{ child.percent }}%</strong> vào tài khoản</span
            >
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { toVnd } from '@/utils/numberFormatter';
import { dateTimeFormatter } from '@/utils/dateFormatter';
export default {
  props: {
    promotion: Object,
  },
  methods: {
    toVnd,
    dateTimeFormatter,
  },
};
</script>

<style scoped src="@/assets/styles/client/promotion.css"></style>
