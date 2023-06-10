<template>
  <el-dialog
    id="deny-post-dialog"
    v-model="modelDialogVisible"
    class="dialog-component"
    :show-close="false"
    width="30%"
  >
    <template #header>
      <div class="dialog-header">
        <h2>Từ chối tin #{{ post.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <div class="inp-group">
        <label for="refused-reason">Lý do từ chối tin</label>
        <el-input
          id="refused-reason"
          type="textarea"
          :rows="8"
          v-model="info.refused_reason"
          placeholder="Nêu cụ thể lý do từ chối tin này"
          clearable
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button type="primary" @click="denyPost()"> Từ chối tin </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import PostService from '@/services/PostService';
import { database, ref, push } from '@/services/FirebaseService';
export default {
  props: {
    dialogVisible: Boolean,
    getPosts: Function,
    post: Object,
  },
  data() {
    return {
      info: {
        refused_reason: '',
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
    clearDialog() {
      this.info.refused_reason = '';
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
    },
    async denyPost() {
      const obj = {
        refused_reason: this.info.refused_reason,
      };
      const res = await PostService.denyPost(this.post.id, obj);
      if (res.status === 200) {
        this.getPosts();
        this.$store.state.toast.success('Từ chối tin thành công');
        this.closeDialog();
        let now = new Date();
        push(ref(database, `notify-user/${this.post.user.id}`), {
          time: now.toISOString(),
          action: 'denied',
          status: false,
          message: `Bài đăng #${this.post.id} đã bị từ chối`,
        });
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
