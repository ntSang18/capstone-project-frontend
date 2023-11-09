<template>
  <el-dialog
    id="view-post-dialog"
    v-model="modelDialogVisible"
    :show-close="false"
    width="80%"
    top="5vh"
    class="dialog-component post-dialog"
  >
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Bài đăng # {{ post.id }}</h2>
        <i class="bx bx-x" @click="closeDialog()"></i>
      </div>
    </template>
    <div class="dialog-body">
      <section id="post-address" class="create-section">
        <div class="left">
          <h2 class="sub-title">Địa chỉ cho thuê</h2>
          <div class="form-address">
            <div class="row grid">
              <div class="inp-group">
                <label>Tỉnh/Thành phố</label>
                <span class="info">{{ post.address.province }}</span>
              </div>
              <div class="inp-group">
                <label>Quận/Huyện</label>
                <span class="info">{{ post.address.district }}</span>
              </div>
              <div class="inp-group">
                <label>Phường/Xã</label>
                <span class="info">{{ post.address.ward }}</span>
              </div>
            </div>
            <div class="row">
              <div class="inp-group">
                <label>Địa chỉ cụ thể</label>
                <span class="info">{{ post.address.specific_address }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8362568392113!2d108.15079177460005!3d16.07398463931167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d76b1a334f%3A0xeca62349bfbee122!2zNjAgxJAuIE5nLiBTxKkgTGnDqm4sIEhvw6AgS2jDoW5oIELhuq9jLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1683388960766!5m2!1svi!2s"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="map"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="post-info" class="create-section half">
        <div class="left">
          <h2 class="sub-title">Thông tin mô tả</h2>
          <div class="form-info">
            <div class="inp-group half">
              <label>Loại chuyên mục</label>
              <span class="info">{{ post.catalog.name }}</span>
            </div>
            <div class="inp-group">
              <label>Tiêu đề</label>
              <span class="info">{{ post.title }}</span>
            </div>
            <div class="inp-group">
              <label>Nội dung mô tả</label>
              <span class="info description">{{ post.description }}</span>
            </div>
            <div class="inp-group half">
              <label>Thông tin liên hệ</label>
              <span class="info">{{ post.user.username }}</span>
            </div>
            <div class="inp-group half">
              <label>Điện thoại</label>
              <span class="info">{{ post.user.phone_number }}</span>
            </div>
            <div class="inp-group half">
              <label>Giá cho thuê</label>
              <span class="info">{{ toVnd(post.price) }}</span>
            </div>
            <div class="inp-group half">
              <label>Tiền cọc</label>
              <span class="info">{{ toVnd(post.deposit) }}</span>
            </div>
            <div class="inp-group half">
              <label>Diện tích</label>
              <span class="info">{{ post.acreage }} m²</span>
            </div>
            <div class="inp-group half">
              <label for="post-target">Đối tượng cho thuê</label>
              <span class="info">{{ target(post.target) }}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <h2 class="sub-title">Hình ảnh</h2>
          <form class="form-img">
            <div class="img-upload-container">
              <div v-for="(media, index) in post.medias" :key="index" class="img-upload-item">
                <img :src="media.url" />
                <div class="item-action">
                  <i class="bx bx-zoom-in" @click="handlePictureCardPreview(media.url)"></i>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section
        v-if="post.status === 'PUBLIC' || post.status === 'EXPIRED'"
        id="post-advance"
        class="create-section half"
      >
        <div class="left">
          <h2 class="sub-title">Thông tin nâng cao</h2>
          <div class="inp-group half">
            <label>Loại tin</label>
            <span class="info">{{ type(post.type) }}</span>
          </div>
          <div class="inp-group half">
            <label>Ngày hết hạn</label>
            <span class="info">{{ dateTimeFormatter(post.expired_at) }}</span>
          </div>
        </div>
        <div class="right"></div>
      </section>

      <el-dialog v-model="imageHandler.dialogVisible">
        <div class="img-dialog-container">
          <img :src="imageHandler.dialogImageUrl" />
        </div>
      </el-dialog>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog()">Thoát</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { toVnd } from '@/utils/numberFormatter';
import { TARGETS } from '@/common/postTargets';
import { TYPES } from '@/common/postTypes';
import { dateTimeFormatter } from '@/utils/dateFormatter';
export default {
  props: {
    dialogVisible: Boolean,
    post: Object,
  },
  data() {
    return {
      imageHandler: {
        dialogVisible: false,
        dialogImageUrl: '',
      },
    };
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
    toVnd,
    dateTimeFormatter,
    closeDialog() {
      this.modelDialogVisible = false;
    },
    handlePictureCardPreview(path) {
      this.imageHandler.dialogImageUrl = path;
      this.imageHandler.dialogVisible = true;
    },
    target(str) {
      const target = TARGETS.find(t => t.value === str);
      return target.name;
    },
    type(str) {
      const type = TYPES.find(t => t.value === str);
      return type.name;
    },
  },
};
</script>

<style src="@/assets/styles/admin/dialog.css"></style>
