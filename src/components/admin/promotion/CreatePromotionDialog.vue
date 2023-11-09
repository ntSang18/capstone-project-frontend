<template>
  <el-dialog
    id="create-promotion-dialog"
    v-model="modelDialogVisible"
    top="5vh"
    class="dialog-component promotion-dialog"
    :show-close="false"
    width="50%"
  >
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Tạo chương trình khuyến mãi mới</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div class="inp-group">
        <label for="name">Tên chương trình khuyến mãi</label>
        <el-input
          id="name"
          type="text"
          v-model="info.name"
          placeholder="Tên chương trình khuyến mãi"
          clearable
        />
      </div>
      <div class="inp-group">
        <label for="time-range">Khoảng thời gian áp dụng chương trình</label>
        <el-date-picker
          v-model="info.time"
          type="datetimerange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </div>
      <ul class="child-inp">
        <h3>Khoảng khuyến mãi</h3>
        <li v-for="(child, index) in info.childs" :key="index" class="child-inp-item">
          <div class="content">
            <div class="inp-group">
              <label :for="`start-range-${index}`">Từ</label>
              <el-input
                :id="`start-range-${index}`"
                type="number"
                v-model="child.start_range"
                size="small"
              >
                <template #append>đ</template>
              </el-input>
            </div>

            <div class="inp-group">
              <label :for="`end-range-${index}`">Đến dưới</label>
              <el-input
                :id="`end-range-${index}`"
                type="number"
                v-model="child.end_range"
                size="small"
              >
                <template #append>đ</template>
              </el-input>
            </div>

            <div class="inp-group">
              <label :for="`percent-${index}`">Khuyến mãi</label>
              <el-input :id="`percent-${index}`" type="number" v-model="child.percent" size="small">
                <template #append>%</template>
              </el-input>
            </div>
          </div>
          <el-button size="small" type="danger" circle @click="removePromotionChild(index)">
            <i class="bx bx-x"></i>
          </el-button>
        </li>
        <button class="add-child-btn" @click="addPromotionChild()">Thêm khoảng khuyến mãi</button>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button type="primary" @click="createPromotion()"> Xác nhận </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import PromotionService from '@/services/PromotionService';
export default {
  props: {
    dialogVisible: Boolean,
    getPromotions: Function,
  },
  data() {
    return {
      info: {
        name: '',
        time: [],
        childs: [
          {
            start_range: null,
            end_range: null,
            percent: null,
          },
        ],
      },
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
  },
  methods: {
    async createPromotion() {
      if (!this.checkInfo()) {
        this.$store.state.toast.info('Vui lòng điền đầy đủ thông tin!');
        return;
      }
      const start = new Date(this.info.time[0]);
      start.setHours(start.getHours() + 7);
      const end = new Date(this.info.time[1]);
      end.setHours(end.getHours() + 7);
      const obj = {
        name: this.info.name,
        start_at: start,
        end_at: end,
        childs: this.info.childs,
      };

      const res = await PromotionService.createPromotion(obj);
      if (res.status === 200) {
        this.$store.state.toast.success('Tạo chương trình khuyến mãi thành công!');
        this.closeDialog();
        this.getPromotions();
      } else if (res.response.status === 409) {
        this.$store.state.toast.error('Xung đột thời gian!');
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
    checkInfo() {
      if (!this.info.name || !this.info.time.length || !this.info.childs.length) {
        return false;
      }
      this.info.childs.forEach(child => {
        if (!child.start_range || !child.percent) {
          return false;
        }
      });
      return true;
    },
    clearDialog() {
      this.info.name = '';
      this.info.time = [];
      this.info.childs = [
        {
          start_range: null,
          end_range: null,
          percent: null,
        },
      ];
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
    },
    addPromotionChild() {
      const obj = {
        start_range: null,
        end_range: null,
        percent: null,
      };
      this.info.childs.push(obj);
    },
    removePromotionChild(index) {
      this.info.childs.splice(index, 1);
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
