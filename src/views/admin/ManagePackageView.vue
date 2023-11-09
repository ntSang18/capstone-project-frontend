<template>
  <main id="package-management" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Quản lý gói tin</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Quản lý gói tin</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <button class="btn-create" @click="openCreatePackagePriceDialog()">
        <i class="bx bxs-plus-circle"></i>
        <span class="text">Tạo gói tin</span>
      </button>
    </div>

    <div class="tab-container">
      <el-tabs>
        <el-tab-pane label="VIP 1">
          <div class="list-container">
            <div class="list-head">
              <h3 class="list-title">Gói tin VIP 1</h3>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
            <div class="list-wrapper">
              <ul>
                <package-item
                  v-for="item in packagePrice.vip1"
                  :key="item.id"
                  :packagePrice="item"
                  :getPackagePrices="getPackagePrices"
                  :openUpdatePackagePriceDialog="openUpdatePackagePriceDialog"
                />
              </ul>
              <p class="summary vip1">
                <strong>TIÊU ĐỀ IN HOA MÀU ĐỎ</strong>, gắn biểu tượng 5 ngôi sao màu vàng và hiển
                thị to và nhiều hình hơn các tin khác. Nằm trên tất cả các tin khác, được hưởng
                nhiều ưu tiên và hiệu quả giao dịch cao nhất.
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="VIP 2">
          <div class="list-container">
            <div class="list-head">
              <h3 class="list-title">Gói tin VIP 2</h3>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
            <div class="list-wrapper">
              <ul>
                <package-item
                  v-for="item in packagePrice.vip2"
                  :key="item.id"
                  :packagePrice="item"
                  :openUpdatePackagePriceDialog="openUpdatePackagePriceDialog"
                />
              </ul>
              <p class="summary vip2">
                <strong>TIÊU ĐỀ IN HOA MÀU HỒNG</strong>, gắn biểu tượng 4 ngôi sao màu vàng ở tiêu
                đề tin đăng. Hiển thị sau tin VIP 1, tin VIP 2 và trên các tin khác.
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="VIP 3">
          <div class="list-container">
            <div class="list-head">
              <h3 class="list-title">Gói tin VIP 3</h3>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
            <div class="list-wrapper">
              <ul>
                <package-item
                  v-for="item in packagePrice.vip3"
                  :key="item.id"
                  :packagePrice="item"
                  :openUpdatePackagePriceDialog="openUpdatePackagePriceDialog"
                />
              </ul>
              <p class="summary vip3">
                <strong>TIÊU ĐỀ IN HOA MÀU CAM</strong>, gắn biểu tượng 3 ngôi sao màu vàng ở tiêu
                đề tin đăng. Hiển thị sau tin VIP 1, tin VIP 2, tin VIP 3 và trên các tin khác.
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="VIP 4">
          <div class="list-container">
            <div class="list-head">
              <h3 class="list-title">Gói tin VIP 4</h3>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
            <div class="list-wrapper">
              <ul>
                <package-item
                  v-for="item in packagePrice.vip4"
                  :key="item.id"
                  :packagePrice="item"
                  :openUpdatePackagePriceDialog="openUpdatePackagePriceDialog"
                />
              </ul>
              <p class="summary vip4">
                <strong>TIÊU ĐỀ IN HOA MÀU XANH</strong>, gắn biểu tượng 2 ngôi sao màu vàng ở tiêu
                đề tin đăng. Hiển thị sau tin VIP 1, tin VIP 2, tin VIP 3, tin VIP 4 và trên các tin
                khác.
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Normal">
          <div class="list-container">
            <div class="list-head">
              <h3 class="list-title">Gói tin VIP 4</h3>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
            <div class="list-wrapper">
              <ul>
                <package-item
                  v-for="item in packagePrice.normal"
                  :key="item.id"
                  :packagePrice="item"
                  :openUpdatePackagePriceDialog="openUpdatePackagePriceDialog"
                />
              </ul>
              <p class="summary normal">
                <strong>Tiêu đề màu mặc định, viết thường</strong>. Hiển thị sau các tin VIP.
              </p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </main>

  <package-price-dialog
    :dialogVisible="dialogVisible"
    :getPackagePrices="getPackagePrices"
    :packagePrice="packagePrice.dialogPackagePrice"
    @triggerDialog="triggerPackagePriceDialog"
  />
</template>

<script>
import PackageItem from '@/components/admin/packagePrice/PackageItem';
import PackagePriceDialog from '@/components/admin/packagePrice/PackagePriceDialog';
import PackagePriceService from '@/services/PackagePriceService';
import { TYPE } from '@/common/postTypes';
export default {
  props: {
    changePage: Function,
  },
  components: {
    PackageItem,
    PackagePriceDialog,
  },
  data() {
    return {
      packagePrice: {
        all: [],
        vip1: [],
        vip2: [],
        vip3: [],
        vip4: [],
        normal: [],
        dialogPackagePrice: null,
      },
      dialogVisible: false,
    };
  },
  mounted() {
    this.changePage(4);
    this.getPackagePrices();
  },
  methods: {
    async getPackagePrices() {
      const res = await PackagePriceService.getPackagePrices();
      if (res.status === 200) {
        this.packagePrice.list = res.data;
        this.packagePrice.vip1 = this.packagePrice.list.filter(p => p.type === TYPE.VIP_1);
        this.packagePrice.vip2 = this.packagePrice.list.filter(p => p.type === TYPE.VIP_2);
        this.packagePrice.vip3 = this.packagePrice.list.filter(p => p.type === TYPE.VIP_3);
        this.packagePrice.vip4 = this.packagePrice.list.filter(p => p.type === TYPE.VIP_4);
        this.packagePrice.normal = this.packagePrice.list.filter(p => p.type === TYPE.NORMAL);
      }
    },
    triggerPackagePriceDialog(value) {
      this.dialogVisible = value;
    },
    openCreatePackagePriceDialog() {
      this.packagePrice.dialogPackagePrice = null;
      this.triggerPackagePriceDialog(true);
    },
    openUpdatePackagePriceDialog(item) {
      this.packagePrice.dialogPackagePrice = item;
      this.triggerPackagePriceDialog(true);
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
