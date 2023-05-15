<template>
  <li class="package-item vip1">
    <div class="item-content">
      <h3 class="name">Gói đăng theo ngày</h3>
      <div class="price">
        <i class="bx bx-purchase-tag"></i>
        <span>80.000</span>
      </div>
      <div class="time">
        <i class="bx bx-time"></i>
        <span><Strong>1 ngày</Strong> kể từ khi đăng ký</span>
      </div>
    </div>
    <div class="operations">
      <el-button type="warning" circle><i class="bx bx-edit"></i></el-button>
      <el-button type="danger" circle><i class="bx bx-trash"></i></el-button>
    </div>
  </li>
</template>

<script>
export default {};
</script>

<style src="@/assets/styles/admin/package_item.css"></style>
