<template>
  <main id="dashboard" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Bảng điều khiển</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Bảng điều khiển</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <ul class="box-info">
      <li>
        <i class="bx bxs-calendar-check"></i>
        <span class="text">
          <h3>1020</h3>
          <p>Tin đang hiển thị</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-group"></i>
        <span class="text">
          <h3>2834</h3>
          <p>Người dùng</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-dollar-circle"></i>
        <span class="text">
          <h3 class="price">150.000.000₫</h3>
          <p>Thu nhập trong tháng</p>
        </span>
      </li>
    </ul>

    <div class="table-data">
      <div class="post">
        <h3 class="head-title">Tin chưa duyệt</h3>
        <el-table
          :data="tableData"
          style="width: 100%"
          cell-class-name="table-cell"
          header-cell-class-name="table-cell"
        >
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <div class="package">
        <h3 class="head-title">Gói đăng tin</h3>
        <ul class="package-list">
          <li class="package-item vip1">
            <p>VIP 1</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item vip2">
            <p>VIP 2</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item vip3">
            <p>VIP 3</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item vip4">
            <p>VIP 4</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item normal">
            <p>Normal</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    };
  },
};
</script>

<style src="@/assets/styles/admin/dashboard.css"></style>
