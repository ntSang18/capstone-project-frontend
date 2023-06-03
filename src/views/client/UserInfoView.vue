<template>
  <div id="info" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Hồ sơ cá nhân</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Hồ sơ cá nhân</h1>
      <form class="form">
        <div class="avatar-container">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" @click="selectImage()" />
          <img
            v-else
            src="@/assets/images/default/default-user.png"
            class="avatar"
            @click="selectImage()"
          />
          <input ref="fileInput" type="file" id="avatar" @change="pickImage()" />
          <el-button type="primary" @click="selectImage()">Chọn ảnh</el-button>
        </div>
        <div class="content-container">
          <div class="content-general">
            <h2 class="content-title">Thông tin chung</h2>
            <div class="inp-group">
              <label for="email">Email</label>
              <el-input id="email" type="email" disabled v-model="info.email" />
            </div>
            <div class="inp-group">
              <label for="phone">Số điện thoại</label>
              <el-input id="phone" type="email" disabled v-model="info.phone_number" />
            </div>
            <div class="inp-group">
              <label for="username">Họ và tên</label>
              <el-input id="username" type="text" clearable v-model="info.username" />
            </div>
            <div class="inp-group">
              <label for="facebook">Facebook</label>
              <el-input
                id="facebook"
                type="text"
                clearable
                placeholder="Liên kết đến tài khoản facebook"
                v-model="info.facebook"
              />
            </div>
          </div>

          <div class="content-address">
            <h2 class="content-title">Thông tin địa chỉ</h2>
            <div class="inp-group">
              <label for="province">Tỉnh, Thành phố</label>
              <el-select
                id="province"
                placeholder="Tỉnh, Thành phố"
                filterable
                v-model="info.province"
                @change="provinceChange()"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.province_id"
                  :label="item.province_name"
                  :value="item.province_name"
                  @click="getDistricts(item.province_id)"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="district">Quận, Huyện, Thị xã</label>
              <el-select
                id="district"
                placeholder="Quận, Huyện, Thị xã"
                filterable
                v-model="info.district"
                @change="districtChange()"
              >
                <el-option
                  v-for="item in districts"
                  :key="item.district_id"
                  :label="item.district_name"
                  :value="item.district_name"
                  @click="getWards(item.district_id)"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="ward">Phường, Xã, Thị trấn</label>
              <el-select
                id="ward"
                filterable
                placeholder="Phường, Xã, Thị trấn"
                v-model="info.ward"
              >
                <el-option
                  v-for="item in wards"
                  :key="item.ward_id"
                  :label="item.ward_name"
                  :value="item.ward_name"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="specific">Địa chỉ cụ thể</label>
              <el-input
                id="specific"
                type="text"
                placeholder="Số nhà, tên đường..."
                clearable
                v-model="info.specific_address"
              />
            </div>
          </div>
        </div>

        <el-button type="primary" @click="updateUser()">Lưu & Cập nhật</el-button>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AddressService from '@/services/AddressService';
import UserService from '@/services/UserService';
import { ElLoading } from 'element-plus';
export default {
  data() {
    return {
      info: {
        id: null,
        email: '',
        phone_number: '',
        username: '',
        facebook: '',
        image: null,
        province: '',
        district: '',
        ward: '',
        specific_address: '',
      },
      provinces: [],
      districts: [],
      wards: [],
      avatarUrl: '',
      dataReady: false,
    };
  },
  mounted() {
    this.getInfo();
    this.getProvinces();
  },
  computed: {
    ...mapState('client', ['user']),
  },
  methods: {
    ...mapActions('client', ['setUser']),
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    getInfo() {
      this.info.id = this.user.id;
      this.info.email = this.user.email;
      this.info.phone_number = this.user.phone_number;
      this.info.username = this.user.username;
      this.info.facebook = this.user.facebook;
      this.info.province = this.user.address.province;
      this.info.district = this.user.address.district;
      this.info.ward = this.user.address.ward;
      this.info.specific_address = this.user.address.specific_address;
      this.avatarUrl = this.user.image_url;
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.info.image = file[0];
        this.avatarUrl = URL.createObjectURL(this.info.image);
      }
    },
    async getProvinces() {
      const res = await AddressService.getProvinces();
      if (res.status === 200) {
        this.provinces = res.data.results;
      }
    },
    async getDistricts(id) {
      const res = await AddressService.getDistricts(id);
      if (res.status === 200) {
        this.districts = res.data.results;
      }
    },
    async getWards(id) {
      const res = await AddressService.getWards(id);
      if (res.status === 200) {
        this.wards = res.data.results;
      }
    },
    provinceChange() {
      this.info.district = '';
      this.info.ward = '';
    },
    districtChange() {
      this.info.ward = '';
    },
    async updateUser() {
      if (!this.info.username.trim()) {
        this.$store.state.toast.error('Tên không được trống!');
        return;
      }
      this.loading();
      this.dataReady = false;

      const obj = new FormData();
      obj.append('phone_number', this.info.phone_number);
      obj.append('username', this.info.username);
      obj.append('facebook', this.info.facebook);
      if (this.info.image) obj.append('image', this.info.image);
      obj.append('province', this.info.province);
      obj.append('district', this.info.district);
      obj.append('ward', this.info.ward);
      obj.append('specific_address', this.info.specific_address);

      const res = await UserService.updateUser(this.info.id, obj);
      if (res.status === 200) {
        this.$store.state.toast.success('Cập nhật thông tin thành công!');
        this.setUser(res.data);
        this.getInfo();
        this.info.image = null;
        this.dataReady = true;
      } else {
        this.$store.state.toast.error('Cập nhật thông tin thất bại!');
        this.getInfo();
        this.info.image = null;
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

<style scoped src="@/assets/styles/client/info.css"></style>
