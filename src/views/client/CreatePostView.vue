<template>
  <div id="create-post" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Cài đặt tài khoản</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Đăng tin mới</h1>
      <div class="alert">
        <p>
          Nếu bạn đã từng đăng tin, hãy sử dụng chức năng ĐẨY TIN / GIA HẠN / NÂNG CẤP VIP trong mục
          QUẢN LÝ TIN để làm mới, đẩy tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không
          được duyệt.
        </p>
      </div>
      <section id="post-address" class="create-section">
        <div class="left">
          <h2 class="sub-title">Địa chỉ cho thuê</h2>
          <form class="form-address">
            <div class="row grid">
              <div class="inp-group">
                <label for="province">Tỉnh/Thành phố</label>
                <el-select
                  id="province"
                  v-model="value"
                  filterable
                  placeholder="-- Chọn tỉnh/tp --"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="inp-group">
                <label for="district">Quận/Huyện</label>
                <el-select
                  id="district"
                  v-model="value"
                  filterable
                  placeholder="-- Chọn quận/huyện --"
                >
                  <el-option
                    v-for="item in district"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="inp-group">
                <label for="commune">Phường/Xã</label>
                <el-select
                  id="commune"
                  v-model="value"
                  filterable
                  placeholder="-- Chọn phường/xã --"
                >
                  <el-option
                    v-for="item in wards"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="inp-group">
                <label for="specific-address">Địa chỉ cụ thể</label>
                <el-select
                  id="specific-address"
                  v-model="query"
                  filterable
                  remote
                  placeholder="Nhập địa chỉ chính xác. Ví dụ 45 Nguyễn Lương Bằng"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </form>
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

      <section id="post-info" class="create-section">
        <div class="left">
          <h2 class="sub-title">Thông tin mô tả</h2>
          <form class="form-info">
            <div class="inp-group half">
              <label for="catalog">Loại chuyên mục</label>
              <el-select id="catalog" v-model="value" placeholder="-- Chọn loại chuyên mục --">
                <el-option
                  v-for="item in postCatalogs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="post-title">Loại chuyên mục</label>
              <el-input
                id="post-title"
                v-model="value"
                maxlength="10"
                placeholder="Tiêu đề bài đăng"
              />
            </div>
            <div class="inp-group">
              <label for="post-summary">Nội dung mô tả</label>
              <el-input
                id="post-summary"
                v-model="value"
                type="textarea"
                autosize
                maxlength="10"
                :row="5"
                placeholder="Mô tả chi tiết cơ sở vật chất cho thuê"
              />
            </div>
            <div class="inp-group half">
              <label for="post-username">Thông tin liên hệ</label>
              <el-input id="post-username" v-model="value" placeholder="User name" disabled />
            </div>
            <div class="inp-group half">
              <label for="post-phone">Điện thoại</label>
              <el-input id="post-phone" v-model="value" placeholder="Phone number" disabled />
            </div>
            <div class="inp-group half">
              <label for="post-price">Giá cho thuê</label>
              <el-input
                id="post-price"
                v-model="value"
                placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
              >
                <template #append>đ</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-deposit">Tiền cọc</label>
              <el-input
                id="post-deposit"
                v-model="value"
                placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
              >
                <template #append>đ</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-acreage">Diện tích</label>
              <el-input
                id="post-acreage"
                v-model="value"
                placeholder="Diện tích cơ sở vật chất cho thuê"
              >
                <template #append>m²</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-target">Đối tượng cho thuê</label>
              <el-select id="post-target" v-model="value" placeholder="-- Tất cả --">
                <el-option
                  v-for="item in postTargets"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </form>
        </div>
        <div class="right">
          <div class="post-note">
            <h4 class="post-note-title">Lưu ý khi đăng tin</h4>
            <ul>
              <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
              <li>Tiêu đề tin không dài quá 100 kí tự</li>
              <li>Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.</li>
              <li>
                Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao
                của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.
              </li>
              <li>
                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không
                có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="post-img" class="create-section">
        <div class="left">
          <h2 class="sub-title">Hình ảnh</h2>
          <p class="sub-text">Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
          <form class="form-img">
            <input
              ref="imgInput"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              multiple
              @change="pickImage"
            />
            <div
              class="drag"
              @click="selectImage"
              @dragover="dragover"
              @dragleave="dragleave"
              @drop="drop"
            >
              <img src="@/assets/images/icon/image-upload.png" />
              <span v-if="isDragging">Thả ảnh vào đây</span>
              <span v-else>Thả ảnh vào đây hoặc <strong>nhấn để chọn ảnh</strong></span>
            </div>
            <div class="img-upload-container">
              <div v-for="(path, index) in imagePaths" :key="index" class="img-upload-item">
                <img :src="path" />
                <div class="item-action">
                  <i class="bx bx-zoom-in" @click="handlePictureCardPreview(path)"></i>
                  <i class="bx bx-trash" @click="delImage(index)"></i>
                </div>
              </div>
            </div>
            <el-dialog v-model="dialogVisible">
              <div class="img-dialog-container">
                <img :src="dialogImageUrl" />
              </div>
            </el-dialog>
          </form>
        </div>
      </section>

      <button class="btn-continue">
        <span>Tiếp tục</span>
      </button>
    </section>
  </div>
</template>

<script>
import { states } from '@/common/demoState';
export default {
  data() {
    return {
      listState: [],
      loading: false,
      options: [],
      query: '',
      states: states,
      images: [],
      isDragging: false,
      dialogVisible: false,
      dialogImageUrl: '',
    };
  },
  mounted() {
    this.listState = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  computed: {
    imagePaths() {
      return this.images.map(img => URL.createObjectURL(img));
    },
  },
  methods: {
    remoteMethod(query) {
      if (query) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.listState.filter(item => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    selectImage() {
      this.$refs.imgInput.click();
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.imgInput.files = e.dataTransfer.files;
      this.pickImage();
      this.isDragging = false;
    },
    pickImage() {
      let files = this.$refs.imgInput.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (this.images.every(e => e.name != files[i].name)) {
            this.images.push(files[i]);
          }
        }
      }
      this.$refs.imgInput.value = null;
    },
    delImage(index) {
      this.images.splice(index, 1);
    },
    handlePictureCardPreview(path) {
      this.dialogImageUrl = path;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/create_post.css"></style>
