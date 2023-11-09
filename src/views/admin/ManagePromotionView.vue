<template>
  <main id="promotion-manage" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Quản lý khuyến mãi</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Quản lý khuyến mãi</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="btn-group">
        <button class="btn-create" @click="triggerCreatePromotionDialog(true)">
          <i class="bx bxs-plus-circle"></i>
          <span class="text">Khuyến mãi mới</span>
        </button>
      </div>
    </div>

    <div class="tab-container">
      <div class="list-container">
        <div class="list-head">
          <h3 class="list-title">Chương trình khuyến mãi</h3>
        </div>
        <div class="list">
          <ul>
            <promotion-item
              v-for="promotion in promotion.all"
              :key="promotion.id"
              :promotion="promotion"
              :openUpdatePromotionDialog="openUpdatePromotionDialog"
              :deletePromotion="deletePromotion"
            />
          </ul>
        </div>
      </div>
    </div>
  </main>

  <create-promotion-dialog
    :dialogVisible="dialogVisible.createPromotion"
    :getPromotions="getPromotions"
    @triggerDialog="triggerCreatePromotionDialog"
  />

  <update-promotion-dialog
    :dialogVisible="dialogVisible.updatePromotion"
    :getPromotions="getPromotions"
    :promotion="promotion.dialogPromotion"
    @triggerDialog="triggerUpdatePromotionDialog"
  />
</template>

<script>
import PromotionItem from '@/components/admin/promotion/PromotionItem';
import CreatePromotionDialog from '@/components/admin/promotion/CreatePromotionDialog';
import UpdatePromotionDialog from '@/components/admin/promotion/UpdatePromotionDialog';
import PromotionService from '@/services/PromotionService';
export default {
  props: {
    changePage: Function,
  },
  components: {
    PromotionItem,
    CreatePromotionDialog,
    UpdatePromotionDialog,
  },
  data() {
    return {
      promotion: {
        all: [],
        dialogPromotion: null,
      },
      dialogVisible: {
        createPromotion: false,
        updatePromotion: false,
      },
    };
  },
  mounted() {
    this.changePage(5);
    this.getPromotions();
  },
  methods: {
    async getPromotions() {
      const res = await PromotionService.getPromotions();
      if (res.status === 200) {
        this.promotion.all = res.data;
      }
    },
    async deletePromotion(id) {
      const res = await PromotionService.deletePromotion(id);
      if (res.status === 200) {
        this.$store.state.toast.success('Xóa chương trình khuyến mãi thành công!');
        this.getPromotions();
      } else {
        this.$store.state.toast.error('Xóa chương trình khuyến mãi thất bại!');
      }
    },
    triggerCreatePromotionDialog(value) {
      this.dialogVisible.createPromotion = value;
    },
    triggerUpdatePromotionDialog(value) {
      this.dialogVisible.updatePromotion = value;
    },
    openUpdatePromotionDialog(item) {
      this.promotion.dialogPromotion = item;
      this.triggerUpdatePromotionDialog(true);
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
