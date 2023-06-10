<template>
  <li :class="`package-item ${this.className}`">
    <div class="item-content">
      <h3 class="name">
        {{ packagePrice.name }}
        <strong>{{ `(${packagePrice.total_purchase} lượt mua)` }}</strong>
      </h3>
      <div class="price">
        <i class="bx bx-purchase-tag"></i>
        <span>{{ toVnd(packagePrice.price) }}</span>
      </div>
      <div class="time">
        <i class="bx bx-time"></i>
        <span
          ><Strong>{{ packagePrice.number_of_days }} ngày</Strong> kể từ khi đăng ký</span
        >
      </div>
    </div>
    <div class="operations">
      <el-button type="warning" circle @click="openUpdatePackagePriceDialog(packagePrice)">
        <i class="bx bx-edit"></i>
      </el-button>
      <el-button type="danger" circle><i class="bx bx-trash"></i></el-button>
    </div>
  </li>
</template>

<script>
import { TYPE } from '@/common/postTypes';
import { toVnd } from '@/utils/numberFormatter';
export default {
  props: {
    packagePrice: Object,
    openUpdatePackagePriceDialog: Function,
  },
  data() {
    return {
      className: '',
    };
  },
  mounted() {
    this.setup();
  },
  methods: {
    toVnd,
    setup() {
      if (this.packagePrice.type === TYPE.VIP_1) this.className = 'vip1';
      else if (this.packagePrice.type === TYPE.VIP_2) this.className = 'vip2';
      else if (this.packagePrice.type === TYPE.VIP_3) this.className = 'vip3';
      else if (this.packagePrice.type === TYPE.VIP_4) this.className = 'vip4';
      else this.className = 'normal';
    },
  },
};
</script>

<style src="@/assets/styles/admin/package_item.css"></style>
