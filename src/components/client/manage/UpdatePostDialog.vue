<template>
  <el-dialog
    id="update-post-dialog"
    v-model="modelDialogVisible"
    :show-close="false"
    width="80%"
    top="5vh"
    class="manage-dialog"
    @open="setupData()"
  >
    <template #header>
      <div class="dialog-header">
        <h2 class="dialog-title">Chỉnh sửa bài đăng #{{ post.id }}</h2>
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
                <label for="province">Tỉnh/Thành phố</label>
                <el-select
                  id="province"
                  v-model="info.province"
                  filterable
                  placeholder="-- Chọn tỉnh/tp --"
                >
                  <el-option
                    v-for="item in addressApi.provinces"
                    :key="item.province_id"
                    :label="item.province_name"
                    :value="item.province_name"
                    @click="getDistricts(item.province_id)"
                  />
                </el-select>
              </div>
              <div class="inp-group">
                <label for="district">Quận/Huyện</label>
                <el-select
                  id="district"
                  v-model="info.district"
                  filterable
                  placeholder="-- Chọn quận/huyện --"
                >
                  <el-option
                    v-for="item in addressApi.districts"
                    :key="item.district_id"
                    :label="item.district_name"
                    :value="item.district_name"
                    @click="getWards(item.district_id)"
                  />
                </el-select>
              </div>
              <div class="inp-group">
                <label for="ward">Phường/Xã</label>
                <el-select
                  id="ward"
                  v-model="info.ward"
                  filterable
                  placeholder="-- Chọn phường/xã --"
                >
                  <el-option
                    v-for="item in addressApi.wards"
                    :key="item.ward_id"
                    :label="item.ward_name"
                    :value="item.ward_name"
                  />
                </el-select>
              </div>
            </div>
            <div class="row">
              <div class="inp-group">
                <label for="specific-address">Địa chỉ cụ thể</label>
                <el-input
                  id="specific-address"
                  v-model="info.specific_address"
                  placeholder="Nhập số nhà và đường. Ví dụ: 60 Ngô Sỹ Liên"
                  clearable
                />
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

      <section id="post-info" class="create-section">
        <div class="left">
          <h2 class="sub-title">Thông tin mô tả</h2>
          <div class="form-info">
            <div class="inp-group half">
              <label for="catalog">Loại chuyên mục</label>
              <el-select
                id="catalog"
                v-model="info.catalog_id"
                placeholder="-- Chọn loại chuyên mục --"
              >
                <el-option
                  v-for="item in catalogs"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="post-title">Tiêu đề</label>
              <el-input
                id="post-title"
                v-model="info.title"
                maxlength="100"
                placeholder="Tiêu đề bài đăng"
              />
            </div>
            <div class="inp-group">
              <label for="post-summary">Nội dung mô tả</label>
              <el-input
                id="post-summary"
                v-model="info.description"
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 20 }"
                placeholder="Mô tả chi tiết cơ sở vật chất cho thuê"
              />
            </div>
            <div class="inp-group half">
              <label for="post-username">Thông tin liên hệ</label>
              <el-input id="post-username" v-model="info.username" disabled />
            </div>
            <div class="inp-group half">
              <label for="post-phone">Điện thoại</label>
              <el-input id="post-phone" v-model="info.phone_number" disabled />
            </div>
            <div class="inp-group half">
              <label for="post-price">Giá cho thuê</label>
              <el-input
                type="number"
                id="post-price"
                v-model="info.price"
                placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                clearable
              >
                <template #append>đ</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-deposit">Tiền cọc</label>
              <el-input
                type="number"
                id="post-deposit"
                v-model="info.deposit"
                placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                clearable
              >
                <template #append>đ</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-acreage">Diện tích</label>
              <el-input
                type="number"
                id="post-acreage"
                v-model="info.acreage"
                placeholder="Diện tích cơ sở vật chất cho thuê"
                clearable
              >
                <template #append>m²</template></el-input
              >
            </div>
            <div class="inp-group half">
              <label for="post-target">Đối tượng cho thuê</label>
              <el-select id="post-target" v-model="info.target" placeholder="-- Tất cả --">
                <el-option
                  v-for="item in postTargets"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
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
            <div class="original-media-container">
              <h3>Ảnh mặc định</h3>
              <div class="img-upload-container">
                <div v-for="(media, index) in info.medias" :key="media.id" class="img-upload-item">
                  <img :src="media.url" />
                  <div class="item-action">
                    <i class="bx bx-zoom-in" @click="handlePictureCardPreview(media.url)"></i>
                    <i class="bx bx-trash" @click="delOriginalImage(index, media)"></i>
                  </div>
                </div>
              </div>
            </div>
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
            <el-dialog v-model="imageHandler.dialogVisible">
              <div class="img-dialog-container">
                <img :src="imageHandler.dialogImageUrl" />
              </div>
            </el-dialog>
          </form>
        </div>
      </section>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog()">Hủy</el-button>
        <el-button type="primary" @click="updatePost()"> Sửa tin </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import AddressService from '@/services/AddressService';
import CatalogService from '@/services/CatalogService';
import { TARGETS } from '@/common/postTargets';
import { TYPES } from '@/common/postTypes';
import PostService from '@/services/PostService';
import { dateTimeFormatter } from '@/utils/dateFormatter';
import { ElLoading } from 'element-plus';
export default {
  props: {
    dialogVisible: Boolean,
    getPosts: Function,
    post: Object,
  },
  data() {
    return {
      info: {
        title: '',
        description: '',
        price: '',
        deposit: '',
        target: '',
        acreage: '',
        province: '',
        district: '',
        ward: '',
        specific_address: '',
        removed_media_ids: [],
        images: [],
        medias: [],
        catalog_id: '',
        username: '',
        phone_number: '',
      },
      imageHandler: {
        isDragging: false,
        dialogVisible: false,
        dialogImageUrl: '',
      },
      addressApi: {
        provinces: [],
        districts: [],
        wards: [],
      },
      catalogs: [],
      postTargets: [],
      postTypes: [],
      dataReady: false,
    };
  },
  mounted() {
    this.getProvinces();
    this.getCatalogs();
    this.postTargets = TARGETS;
    this.postTypes = TYPES;
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
    imagePaths() {
      return this.info.images.map(img => URL.createObjectURL(img));
    },
  },
  methods: {
    dateTimeFormatter,
    loading() {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    setupData() {
      this.dataReady = false;
      this.info.title = this.post.title;
      this.info.description = this.post.description;
      this.info.price = this.post.price;
      this.info.deposit = this.post.deposit;
      this.info.target = this.post.target;
      this.info.acreage = this.post.acreage;
      this.info.province = this.post.address.province;
      this.info.district = this.post.address.district;
      this.info.ward = this.post.address.ward;
      this.info.specific_address = this.post.address.specific_address;
      this.info.catalog_id = this.post.catalog.id;
      this.info.username = this.post.user.username;
      this.info.phone_number = this.post.user.phone_number;
      this.info.medias = this.post.medias;
    },
    clearDialog() {
      this.dataReady = false;
      this.info.title = '';
      this.info.description = '';
      this.info.price = '';
      this.info.deposit = '';
      this.info.target = '';
      this.info.acreage = '';
      this.info.province = '';
      this.info.district = '';
      this.info.ward = '';
      this.info.specific_address = '';
      this.info.images = [];
      this.info.medias = [];
      this.info.removed_media_ids = [];
      this.info.catalog_id = '';
      this.info.username = '';
      this.info.phone_number = '';
    },
    closeDialog() {
      this.clearDialog();
      this.modelDialogVisible = false;
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
          if (this.info.images.every(e => e.name != files[i].name)) {
            this.info.images.push(files[i]);
          }
        }
      }
      this.$refs.imgInput.value = null;
    },
    delImage(index) {
      this.info.images.splice(index, 1);
    },
    delOriginalImage(index, media) {
      this.info.medias.splice(index, 1);
      this.info.removed_media_ids.push(media.id);
    },
    handlePictureCardPreview(path) {
      this.imageHandler.dialogImageUrl = path;
      this.imageHandler.dialogVisible = true;
    },
    async getProvinces() {
      const res = await AddressService.getProvinces();
      if (res.status === 200) {
        this.addressApi.provinces = res.data.results;
      }
    },
    async getDistricts(id) {
      const res = await AddressService.getDistricts(id);
      if (res.status === 200) {
        this.addressApi.districts = res.data.results;
      }
    },
    async getWards(id) {
      const res = await AddressService.getWards(id);
      if (res.status === 200) {
        this.addressApi.wards = res.data.results;
      }
    },
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalogs = res.data;
      }
    },
    checkInfo() {
      if (
        !this.info.title ||
        !this.info.description ||
        !this.info.price ||
        !this.info.deposit ||
        !this.info.target ||
        !this.info.acreage ||
        !this.info.province ||
        !this.info.district ||
        !this.info.ward ||
        !this.info.specific_address ||
        !this.info.catalog_id
      ) {
        return false;
      }
      return true;
    },
    createFormData() {
      const obj = new FormData();
      obj.append('title', this.info.title);
      obj.append('description', this.info.description);
      obj.append('price', this.info.price);
      obj.append('deposit', this.info.deposit);
      obj.append('target', this.info.target);
      obj.append('acreage', this.info.acreage);
      obj.append('province', this.info.province);
      obj.append('district', this.info.district);
      obj.append('ward', this.info.ward);
      obj.append('specific_address', this.info.specific_address);
      this.info.removed_media_ids.forEach(id => obj.append('removed_media_ids', id));
      this.info.images.forEach(image => obj.append('images', image));
      obj.append('catalog_id', this.info.catalog_id);
      return obj;
    },
    async updatePost() {
      if (!this.checkInfo()) {
        this.$store.state.toast.info('Vui lòng nhập đầy đủ thông tin!');
        return;
      }

      this.dataReady = false;
      this.loading();
      const obj = this.createFormData();

      const res = await PostService.updatePost(this.post.id, obj);
      if (res.status === 200) {
        this.$store.state.toast.success('Chỉnh sửa tin đăng thành công!');
        this.dataReady = true;
        this.closeDialog();
        this.getPosts();
      } else {
        this.$store.state.toast.error('Có lỗi xảy ra!');
        this.dataReady = true;
      }
    },
  },
  watch: {
    dataReady() {
      if (this.dataReady) {
        this.loading();
      }
    },
  },
};
</script>

<style src="@/assets/styles/client/manage_dialog.css"></style>
