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
        <el-table :data="tableData" style="width: 100%" :border="true" max-height="500">
          <el-table-column label="Ngày nạp" prop="date" sortable />
          <el-table-column label="Phương thức" prop="method" />
          <el-table-column label="Giá" prop="price" sortable>
            <template #default="scope">
              <span>{{ numberToVND(scope.row.price) }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Khuyến mãi" prop="discount" sortable />
          <el-table-column label="Thực nhận" prop="receipt" sortable>
            <template #default="scope">
              <span>{{ numberToVND(scope.row.receipt) }}</span>
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
          <el-table-column label="Ghi chú" prop="note" width="250" />
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
          method: 'MOMO',
          price: 50000,
          discount: '0%',
          receipt: 50000,
          status: 'success',
          note: '',
        },
        {
          date: '2023-05-01',
          method: 'ZaloPay',
          price: 100000,
          discount: '0%',
          receipt: 0,
          status: 'fail',
          note: 'Nạp tiền không thành công, Lỗi: #49, Đơn hàng đã bị huỷ bỏ',
        },
        {
          date: '2023-05-04',
          method: 'MOMO',
          price: 10000,
          discount: '0%',
          receipt: 10000,
          status: 'success',
          note: '',
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
