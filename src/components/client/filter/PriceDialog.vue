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
        <h2 class="dialog-title">Chọn giá</h2>
      </div>
    </template>

    <div class="dialog-body">
      <div class="price-text">
        <p v-if="modelFilterPrice[0] === modelFilterPrice[1] && modelFilterPrice[0] === 15000000">
          {{ `Trên ${toVnd(modelFilterPrice[0])}` }}
        </p>
        <p v-else-if="modelFilterPrice[0] === modelFilterPrice[1]">
          {{ `${toVnd(modelFilterPrice[0])}` }}
        </p>
        <p v-else>
          {{ `${toVnd(modelFilterPrice[0])} - ${toVnd(modelFilterPrice[1])}` }}
        </p>
      </div>

      <div class="slider-block">
        <el-slider
          v-model="modelFilterPrice"
          range
          :step="1000000"
          :max="15000000"
          :marks="marks"
          :format-tooltip="toVndString"
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
import { toVnd } from '@/utils/numberFormatter';
import { PRICE_RANGE } from '@/common/filterPriceRange';
export default {
  props: {
    dialogVisible: Boolean,
    filterPrice: Array,
    activeFilterPrice: Function,
  },
  data() {
    return {
      marks: {
        0: '0',
        15000000: '15 triệu+',
      },
      ranges: [],
    };
  },
  mounted() {
    this.ranges = PRICE_RANGE;
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
    modelFilterPrice: {
      get() {
        return this.filterPrice;
      },
      set(value) {
        this.$emit('triggerFilterPrice', value);
      },
    },
  },
  methods: {
    toVnd,
    closeDialog() {
      this.modelDialogVisible = false;
    },
    selectedRange(value) {
      this.modelFilterPrice = value;
    },
    active() {
      this.closeDialog();
      this.activeFilterPrice();
    },
  },
};
</script>

<style src="@/assets/styles/client/filter_dialog.css"></style>
