<template>
  <div id="payment-history" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Lịch sử nạp tiền</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Lịch sử nạp tiền</h1>
      <div class="table-content">
        <el-table
          :data="transactions"
          stripe
          :default-sort="{ prop: 'created_at' }"
          style="width: 100%"
          :border="true"
          height="400"
          max-height="500"
        >
          <el-table-column label="Ngày nạp" prop="created_at" sortable>
            <template #default="scope">
              <span>{{ dateTimeFormatter(scope.row.created_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Phương thức" prop="method" />
          <el-table-column label="Giá" prop="money" sortable>
            <template #default="scope">
              <span>{{ toVnd(scope.row.money) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Khuyến mãi" prop="discount" sortable>
            <template #default="scope">
              <span>{{ scope.row.discount * 100 }}%</span>
            </template>
          </el-table-column>
          <el-table-column label="Thực nhận" prop="actual_money" sortable>
            <template #default="scope">
              <span>{{ toVnd(scope.row.actual_money) }}</span>
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
import TransactionService from '@/services/TransactionService';
export default {
  data() {
    return {
      transactions: [],
    };
  },
  mounted() {
    this.getPersonalTransactions();
  },
  methods: {
    toVnd,
    dateTimeFormatter,
    async getPersonalTransactions() {
      const res = await TransactionService.getPersonalTransactions();
      if (res.status === 200) {
        this.transactions = res.data;
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/history.css"></style>
