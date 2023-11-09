<template>
  <div id="purchase-history" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Lịch sử thanh toán</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Lịch sử thanh toán ({{ payment.list.length }} lượt mua)</h1>
      <div class="table-content">
        <el-table
          :data="payment.list"
          stripe
          :default-sort="{ prop: 'id' }"
          style="width: 100%"
          :border="true"
          height="400"
          max-height="500"
        >
          <el-table-column label="Thời gian" prop="scope.row.paid_at" sortable width="180">
            <template #default="scope">
              <span>{{ dateTimeFormatter(scope.row.paid_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Gói tin" prop="package_price.name" width="250" />
          <el-table-column label="Loại tin">
            <template #default="scope">
              <p :class="`type ${scope.row.package_price.type}`">
                {{ typeName(scope.row.package_price.type) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="Mã tin đăng" prop="post.id" sortable />
          <el-table-column label="Số lượng mua" prop="number_package" />
          <el-table-column label="Tổng phí" prop="price" sortable>
            <template #default="scope">
              <span>{{ toVnd(scope.row.number_package * scope.row.package_price.price) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
import { toVnd } from '@/utils/numberFormatter';
import { dateTimeFormatter } from '@/utils/dateFormatter';
import { TYPES } from '@/common/postTypes';
import PostPaymentService from '@/services/PostPaymentService';
export default {
  data() {
    return {
      payment: {
        list: [],
      },
    };
  },
  mounted() {
    this.getPersonalPostPayments();
  },
  methods: {
    toVnd,
    dateTimeFormatter,
    async getPersonalPostPayments() {
      const res = await PostPaymentService.getPersonalPostPayments();
      if (res.status === 200) {
        this.payment.list = res.data;
      }
    },
    typeName(type) {
      var res = TYPES.find(t => t.value === type);
      return res.name;
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/history.css"></style>
