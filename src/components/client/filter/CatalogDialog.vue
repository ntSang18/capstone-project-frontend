<template>
  <el-dialog
    v-model="modelDialogVisible"
    width="50%"
    :show-close="false"
    class="filter-dialog"
    top="10vh"
  >
    <template #header>
      <div class="dialog-header">
        <i class="bx bx-arrow-back" @click="closeDialog()"></i>
        <h2 class="dialog-title">Chọn loại danh mục</h2>
      </div>
    </template>
    <div class="dialog-body">
      <div class="list-radio">
        <label for="catalog-all" class="radio-item">
          <input type="radio" :value="0" id="catalog-all" v-model="modelFilterCatalog" />
          <span>Tất cả danh mục</span>
        </label>
        <label
          v-for="catalog in catalogs"
          :key="catalog.id"
          :for="`catalog-${catalog.id}`"
          class="radio-item"
        >
          <input
            type="radio"
            :value="catalog.id"
            :id="`catalog-${catalog.id}`"
            v-model="modelFilterCatalog"
          />
          <span>{{ catalog.name }}</span>
        </label>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    catalogs: Array,
    filterCatalog: Number,
  },
  data() {
    return {};
  },
  computed: {
    modelDialogVisible: {
      get() {
        return this.dialogVisible;
      },
      set(value) {
        this.$emit('triggerDialog', value);
      },
    },
    modelFilterCatalog: {
      get() {
        return this.filterCatalog;
      },
      set(value) {
        this.$emit('triggerFilterCatalog', value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.modelDialogVisible = false;
    },
  },
};
</script>

<style src="@/assets/styles/client/filter_dialog.css"></style>
