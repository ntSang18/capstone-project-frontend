<template>
  <el-dialog
    v-model="modelDialogVisible"
    width="50%"
    :show-close="false"
    class="filter-dialog range-dialog"
    top="10vh"
  >
    <template #header>
      <div class="dialog-header">
        <i class="bx bx-arrow-back" @click="closeDialog()"></i>
        <h2 class="dialog-title">Chọn diện tích</h2>
      </div>
    </template>

    <div class="dialog-body">
      <div class="price-text">
        <p v-if="modelFilterAcreage[0] === modelFilterAcreage[1] && modelFilterAcreage[0] === 90">
          {{ `Trên ${modelFilterAcreage[0]}m²` }}
        </p>
        <p v-else-if="modelFilterAcreage[0] === modelFilterAcreage[1]">
          {{ `${modelFilterAcreage[0]}m²` }}
        </p>
        <p v-else>
          {{ `${modelFilterAcreage[0]}m² - ${modelFilterAcreage[1]}m²` }}
        </p>
      </div>

      <div class="slider-block">
        <el-slider
          v-model="modelFilterAcreage"
          range
          :step="5"
          :max="90"
          :marks="marks"
          :format-tooltip="formatTooltip"
        />
      </div>
      <p class="sub-title">Chọn nhanh</p>
      <ul class="list-range">
        <li
          v-for="(item, index) in ranges"
          :key="index"
          class="range-item"
          @click="selectedRange(item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <button @click="active()">Áp dụng</button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ACREAGE_RANGE } from '@/common/filterAcreageRange';
export default {
  props: {
    dialogVisible: Boolean,
    filterAcreage: Array,
    activeFilterAcreage: Function,
  },
  data() {
    return {
      marks: {
        0: '0m²',
        90: '90m²',
      },
      ranges: [],
    };
  },
  mounted() {
    this.ranges = ACREAGE_RANGE;
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
    modelFilterAcreage: {
      get() {
        return this.filterAcreage;
      },
      set(value) {
        this.$emit('triggerFilterAcreage', value);
      },
    },
  },
  methods: {
    formatTooltip(val) {
      return `${val}m²`;
    },
    closeDialog() {
      this.modelDialogVisible = false;
    },
    selectedRange(value) {
      this.modelFilterAcreage = value;
    },
    active() {
      this.closeDialog();
      this.activeFilterAcreage();
    },
  },
};
</script>

<style src="@/assets/styles/client/filter_dialog.css"></style>
