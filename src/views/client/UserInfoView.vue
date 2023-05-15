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
              <el-input id="email" type="email" disabled />
            </div>
            <div class="inp-group">
              <label for="phone">Số điện thoại</label>
              <el-input id="phone" type="email" disabled />
            </div>
            <div class="inp-group">
              <label for="username">Họ và tên</label>
              <el-input id="username" type="text" clearable />
            </div>
            <div class="inp-group">
              <label for="facebook">Facebook</label>
              <el-input
                id="facebook"
                v-model="input"
                type="text"
                clearable
                placeholder="Liên kết đến tài khoản facebook"
              />
            </div>
          </div>

          <div class="content-address">
            <h2 class="content-title">Thông tin địa chỉ</h2>
            <div class="inp-group">
              <label for="province">Tỉnh, Thành phố</label>
              <el-select id="province" placeholder="Tỉnh, Thành phố">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="district">Quận, Huyện, Thị xã</label>
              <el-select id="district" placeholder="Quận, Huyện, Thị xã">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="commune">Phường, Xã, Thị trấn</label>
              <el-select id="commune" placeholder="Phường, Xã, Thị trấn">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div class="inp-group">
              <label for="specific">Địa chị cụ thể</label>
              <el-input id="specific" type="text" placeholder="Địa chị cụ thể" clearable />
            </div>
          </div>
        </div>

        <el-button type="primary">Lưu & Cập nhật</el-button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      input: '',
      avatarUrl: '',
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.imagePicked = file[0];
        this.avatarUrl = URL.createObjectURL(this.imagePicked);
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/info.css"></style>
