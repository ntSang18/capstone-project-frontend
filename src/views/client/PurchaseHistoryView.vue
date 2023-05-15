<template>
  <div id="purchase-history" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Lịch sử thanh toán</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Lịch sử thanh toán</h1>
      <div class="table-content">
        <el-table :data="tableData" style="width: 100%" :border="true" max-height="500">
          <el-table-column label="Ngày thanh toán" prop="date" sortable width="180" />
          <el-table-column label="Mã tin đăng" prop="post_id" sortable />
          <el-table-column label="Loại tin" prop="post_type" />
          <el-table-column label="Số dư" prop="before_balance">
            <template #default="scope">
              <span>{{ numberToVND(scope.row.before_balance) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Phí" prop="price" sortable>
            <template #default="scope">
              <span>{{ numberToVND(scope.row.price) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Còn lại" prop="after_balance">
            <template #default="scope">
              <span>{{ numberToVND(scope.row.after_balance) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Trạng thái"
            prop="status"
            :filters="[
              { text: 'Thành công', value: 'success' },
              { text: 'Thất bại', value: 'fail' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom"
          >
            <template #default="scope">
              <el-tag v-if="scope.row.status === 'success'" :class="'status ' + scope.row.status"
                >Thành công</el-tag
              >
              <el-tag v-else :class="'status ' + scope.row.status">Thất bại</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
import numberToVND from '@/utils/numberToVND';
export default {
  data() {
    return {
      tableData: [
        {
          date: '2023-05-02',
          post_id: 1,
          post_type: 'VIP 1',
          before_balance: 1000000,
          price: 50000,
          after_balance: 950000,
          status: 'success',
        },
        {
          date: '2023-05-03',
          post_id: 2,
          post_type: 'VIP 2',
          before_balance: 950000,
          price: 50000,
          after_balance: 950000,
          status: 'fail',
        },
        {
          date: '2023-05-04',
          post_id: 2,
          post_type: 'VIP 2',
          before_balance: 950000,
          price: 50000,
          after_balance: 900000,
          status: 'success',
        },
      ],
    };
  },
  methods: {
    numberToVND,
  },
};
</script>

<style scoped src="@/assets/styles/client/history.css"></style>
