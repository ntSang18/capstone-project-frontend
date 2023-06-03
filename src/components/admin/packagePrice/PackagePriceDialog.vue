<template>
  <el-dialog
    id="package-dialog"
    v-model="modelDialogVisible"
    class="dialog-component"
    :show-close="false"
    width="30%"
    @open="setInfo()"
  >
    <template #header>
      <div class="dialog-header">
        <h2 v-if="isCreateDialog" class="dialog-title">Tạo gói tin</h2>
        <h2 v-else class="dialog-title">Sửa gói tin #{{ packagePrice.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div class="inp-group">
        <label for="name">Tên danh mục</label>
        <el-input id="name" type="text" v-model="info.name" placeholder="Tên danh mục" clearable />
      </div>
      <div class="inp-group">
        <label for="vip">Loại tin</label>
        <el-select id="vip" v-model="info.type" placeholder="-- Chọn loại tin --">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="inp-group">
        <label for="price">Giá</label>
        <el-input
          type="number"
          id="price"
          v-model="info.price"
          placeholder="Nhập giá của 1 gói tin"
          clearable
        >
          <template #append>đ</template></el-input
        >
      </div>
      <div class="inp-group">
        <label for="number-of-days">Số ngày hiển thị tin</label>
        <el-input-number v-model="info.numberOfDays" :min="0" />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button v-if="isCreateDialog" type="primary" @click="createPackagePrice()">
          Xác nhận
        </el-button>
        <el-button v-else type="primary" @click="updatePackagePrice()"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import PackagePriceService from '@/services/PackagePriceService';
import { TYPES } from '@/common/postTypes';
export default {
  props: {
    dialogVisible: Boolean,
    packagePrice: Object,
    getPackagePrices: Function,
  },
  data() {
    return {
      info: {
        name: '',
        price: '',
        numberOfDays: 0,
        type: '',
      },
      types: [],
    };
  },
  mounted() {
    this.types = TYPES;
  },
  computed: {
    modelDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(value) {
        this.clearDialog();
        this.$emit('triggerDialog', value);
      },
    },
    isCreateDialog() {
      if (this.packagePrice) {
        return false;
      }
      return true;
    },
  },
  methods: {
    clearDialog() {
      this.info.name = '';
      this.info.price = '';
      this.info.numberOfDays = 0;
      this.info.type = '';
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
    },
    setInfo() {
      if (!this.isCreateDialog) {
        this.info.name = this.packagePrice.name;
        this.info.price = this.packagePrice.price;
        this.info.numberOfDays = this.packagePrice.number_of_days;
        this.info.type = this.packagePrice.type;
      }
    },
    async createPackagePrice() {
      const obj = {
        name: this.info.name,
        price: this.info.price,
        number_of_days: this.info.numberOfDays,
        type: this.info.type,
      };
      const res = await PackagePriceService.createPackagePrice(obj);
      if (res.status === 200) {
        this.getPackagePrices();
        this.$store.state.toast.success('Tạo gói tin thành công!');
        this.closeDialog();
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
    async updatePackagePrice() {
      const obj = {
        name: this.info.name,
        price: this.info.price,
        number_of_days: this.info.numberOfDays,
        type: this.info.type,
      };
      const res = await PackagePriceService.updatePackagePrice(this.packagePrice.id, obj);
      if (res.status === 200) {
        this.getPackagePrices();
        this.$store.state.toast.success('Sửa gói tin thành công!');
        this.closeDialog();
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
