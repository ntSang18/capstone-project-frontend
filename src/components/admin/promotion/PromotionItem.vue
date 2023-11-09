<template>
  <li class="promotion-item">
    <input type="checkbox" :id="`checkbox-${promotion.id}`" />
    <label :for="`checkbox-${promotion.id}`">
      <div class="head">
        <h3 class="name">{{ promotion.name }}</h3>
        <el-tag v-if="promotionStatus() === 1" size="large" effect="dark" type="success"
          >Đang kích hoạt</el-tag
        >
        <el-tag v-else-if="promotionStatus() === 2" size="large" effect="dark" type="info"
          >Chưa kích hoạt</el-tag
        >
        <el-tag v-else size="large" effect="dark" type="warning">Đã kích hoạt</el-tag>
        <div class="operations">
          <el-button type="warning" circle @click="openUpdatePromotionDialog(promotion)">
            <i class="bx bx-edit"></i>
          </el-button>
          <el-popconfirm
            width="190"
            confirm-button-type="danger"
            confirm-button-text="Xác nhận"
            cancel-button-text="Hủy"
            title="Xác nhận xóa chương trình khuyến mãi này?"
            @confirm="deletePromotion(promotion.id)"
          >
            <template #reference>
              <el-button type="danger" circle><i class="bx bx-trash"></i></el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="time">
        <i class="bx bx-time"></i>
        <span>
          Từ <strong>{{ dateFormatter(promotion.start_at) }}</strong> đến
          <strong>{{ dateFormatter(promotion.end_at) }}</strong></span
        >
      </div>
    </label>
    <ul class="promotion-child">
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
  </li>
</template>

<script>
import { dateFormatter } from '@/utils/dateFormatter';
import { toVnd } from '@/utils/numberFormatter';
export default {
  props: {
    promotion: Object,
    openUpdatePromotionDialog: Function,
    deletePromotion: Function,
  },
  methods: {
    dateFormatter,
    toVnd,
    promotionStatus() {
      const now = new Date();
      const startAt = new Date(this.promotion.start_at);
      const endAt = new Date(this.promotion.end_at);
      if (now.getTime() > startAt.getTime() && now.getTime() < endAt.getTime()) {
        return 1;
      } else if (now.getTime() < startAt.getTime()) {
        return 2;
      } else {
        return 3;
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/promotion_item.css"></style>
