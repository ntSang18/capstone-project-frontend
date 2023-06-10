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
                  v-model="info.address.province"
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
                  v-model="info.address.district"
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
                <label for="commune">Phường/Xã</label>
                <el-select
                  id="ward"
                  v-model="info.address.ward"
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
                  v-model="info.address.specific_address"
                  placeholder="Nhập số nhà và đường. Ví dụ: 60 Ngô Sỹ Liên"
                  clearable
                />
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
                :autosize="{ minRows: 10, maxRows: 20 }"
                placeholder="Mô tả chi tiết cơ sở vật chất cho thuê"
              />
            </div>
            <div class="inp-group half">
              <label for="post-username">Thông tin liên hệ</label>
              <el-input id="post-username" v-model="additionalInfo.username" disabled />
            </div>
            <div class="inp-group half">
              <label for="post-phone">Điện thoại</label>
              <el-input id="post-phone" v-model="additionalInfo.phoneNumber" disabled />
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
                <template #append>đ/tháng</template></el-input
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
              <span v-if="imageHandler.isDragging">Thả ảnh vào đây</span>
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

      <button class="btn-continue" @click="createPost()">
        <span>Tiếp tục</span>
      </button>
    </section>
  </div>
</template>

<script>
import AddressService from '@/services/AddressService';
import { TARGETS } from '@/common/postTargets';
import { TYPES } from '@/common/postTypes';
import { mapState } from 'vuex';
import PostService from '@/services/PostService';
import CatalogService from '@/services/CatalogService';
import { database, ref, push } from '@/services/FirebaseService';
import { ElLoading } from 'element-plus';
export default {
  data() {
    return {
      info: {
        title: '',
        description: '',
        price: '',
        deposit: '',
        target: '',
        acreage: '',
        address: {
          province: '',
          district: '',
          ward: '',
          specific_address: '',
        },
        images: [],
        catalog_id: '',
        user_id: null,
      },
      additionalInfo: {
        username: '',
        phoneNumber: '',
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
    this.setupData();
  },
  computed: {
    ...mapState('client', ['user']),
    imagePaths() {
      return this.info.images.map(img => URL.createObjectURL(img));
    },
  },
  methods: {
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    setupData() {
      this.getProvinces();
      this.getCatalogs();
      this.postTargets = TARGETS;
      this.postTypes = TYPES;
      this.info.user_id = this.user.id;
      this.additionalInfo.username = this.user.username;
      this.additionalInfo.phoneNumber = this.user.phone_number;
    },
    selectImage() {
      this.$refs.imgInput.click();
    },
    dragover(e) {
      e.preventDefault();
      this.imageHandler.isDragging = true;
    },
    dragleave() {
      this.imageHandler.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.imgInput.files = e.dataTransfer.files;
      this.pickImage();
      this.imageHandler.isDragging = false;
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
    handlePictureCardPreview(path) {
      this.imageHandler.dialogImageUrl = path;
      this.imageHandler.dialogVisible = true;
    },
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalogs = res.data;
      }
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
    checkInfo() {
      if (
        !this.info.title ||
        !this.info.description ||
        !this.info.price ||
        !this.info.deposit ||
        !this.info.target ||
        !this.info.acreage ||
        !this.info.address.province ||
        !this.info.address.district ||
        !this.info.address.ward ||
        !this.info.address.specific_address ||
        !this.info.images.length ||
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
      obj.append('province', this.info.address.province);
      obj.append('district', this.info.address.district);
      obj.append('ward', this.info.address.ward);
      obj.append('specific_address', this.info.address.specific_address);
      this.info.images.forEach(image => obj.append('images', image));
      obj.append('user_id', this.info.user_id);
      obj.append('catalog_id', this.info.catalog_id);
      return obj;
    },
    async createPost() {
      if (!this.checkInfo()) {
        this.$store.state.toast.info('Vui lòng nhập đầy đủ thông tin!');
        return;
      }

      const obj = this.createFormData();

      this.loading();
      this.dataReady = false;

      const res = await PostService.createPost(obj);
      if (res.status === 200) {
        let now = new Date();
        push(ref(database, 'notify-admin'), {
          time: now.toISOString(),
          action: 'create_post',
          status: false,
          message: `Người dùng đăng tin mới #${res.data.id}`,
        });
        this.dataReady = true;
        this.$router.push('/notify');
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

<style scoped src="@/assets/styles/client/create_post.css"></style>
