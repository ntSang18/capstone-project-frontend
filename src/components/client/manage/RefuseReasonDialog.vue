<template>
  <el-dialog v-model="modelDialogVisible" :show-close="false" width="30%" class="manage-dialog">
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Lý do từ chối bài đăng #{{ post.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <p class="refuse-reason">{{ post.refused_reason }}</p>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog()">Thoát</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    post: Object,
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
  },
  methods: {
    closeDialog() {
      this.modelDialogVisible = false;
    },
  },
};
</script>

<style src="@/assets/styles/client/manage_dialog.css"></style>
