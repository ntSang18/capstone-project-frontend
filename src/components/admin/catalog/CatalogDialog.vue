<template>
  <el-dialog
    id="catalog-dialog"
    v-model="modelDialogVisible"
    class="dialog-component"
    :show-close="false"
    width="30%"
    @open="setInfo()"
  >
    <template #header>
      <div class="dialog-header">
        <h2 v-if="isCreateDialog" class="dialog-title">Tạo danh mục mới</h2>
        <h2 v-else class="dialog-title">Sửa danh mục #{{ catalog.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div :class="error ? 'error show' : 'error'">
        <span>{{ error }}</span>
      </div>
      <div class="inp-group">
        <label for="name">Tên danh mục</label>
        <el-input id="name" type="text" v-model="info.name" placeholder="Tên danh mục" clearable />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button v-if="isCreateDialog" type="primary" @click="createCatalog()">
          Xác nhận
        </el-button>
        <el-button v-else type="primary" @click="updateCatalog()"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import CatalogService from '@/services/CatalogService';
export default {
  props: {
    dialogVisible: Boolean,
    catalog: Object,
    getCatalogs: Function,
  },
  data() {
    return {
      info: {
        name: '',
      },
      error: '',
    };
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
      if (this.catalog) {
        return false;
      }
      return true;
    },
  },
  methods: {
    clearDialog() {
      this.info.name = '';
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
    },
    setInfo() {
      if (!this.isCreateDialog) {
        this.info.name = this.catalog.name;
      }
    },
    async createCatalog() {
      const obj = {
        name: this.info.name,
      };
      const res = await CatalogService.createCatalog(obj);
      if (res.status === 200) {
        this.getCatalogs();
        this.$store.state.toast.success('Tạo danh mục thành công!');
        this.closeDialog();
      } else if (res.response.status === 406) {
        this.$store.state.toast.error('Tên danh mục đã được sử dụng!');
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
    async updateCatalog() {
      const obj = {
        name: this.info.name,
      };
      const res = await CatalogService.updateCatalog(this.catalog.id, obj);
      if (res.status === 200) {
        this.getCatalogs();
        this.$store.state.toast.success('Sửa danh mục thành công!');
        this.closeDialog();
      } else if (res.response.status === 406) {
        this.$store.state.toast.error('Tên danh mục đã được sử dụng!');
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
