<template>
  <div id="analysis" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Tham khảo giá</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="overview">
      <div class="img-background"></div>
      <div class="header">
        <h1>Toàn cảnh biến động giá tháng 5</h1>
        <p>Số liệu được tính dựa trên giá thuê thực tế từ các bài đăng</p>
      </div>
      <div class="about">
        <div class="about-item">
          <img src="@/assets/images/background/stock.png" />
          <p>Giá thực tế đang giao dịch trên thị trường</p>
        </div>
        <div class="about-item">
          <img src="@/assets/images/background/location.png" />
          <p>Chi tiết đến từng khu vực của các tỉnh thành</p>
        </div>
        <div class="about-item">
          <img src="@/assets/images/background/investment.png" />
          <p>Phân loại riêng theo từng danh mục cho thuê</p>
        </div>
      </div>
    </section>

    <section id="filter">
      <div class="filter-container">
        <div class="header">
          <h1>Xem giá bất động sản</h1>
          <p>Chọn khu vực và loại bất động sản mà bạn muốn xem</p>
        </div>
        <div class="select">
          <el-select v-model="value" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="value" class="m-2" placeholder="Select" size="large">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <button>Xem giá ngay</button>
        </div>
      </div>
    </section>

    <section id="default-content">
      <div class="header">Giá BĐS tại các tỉnh thành</div>
      <div class="graph"></div>
      <div class="box-info-group">
        <div class="box-info-item">
          <div class="info-container">
            <h2>Đà Nẵng</h2>
            <div class="info-row">
              <p>Giá trung bình tháng 5</p>
              <p>120.000/m2</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 4/2023</p>
              <p>-2.4%</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 5/2022</p>
              <p>4.5%</p>
            </div>
            <div class="detail-btn">
              <button>Xem chi tiết <i class="bx bx-chevron-right"></i></button>
            </div>
          </div>
        </div>
        <div class="box-info-item">
          <div class="info-container">
            <h2>Hà Nội</h2>
            <div class="info-row">
              <p>Giá trung bình tháng 5</p>
              <p>135.000/m2</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 4/2023</p>
              <p>-0.3%</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 5/2022</p>
              <p>-10.1%</p>
            </div>
            <div class="detail-btn">
              <button>Xem chi tiết <i class="bx bx-chevron-right"></i></button>
            </div>
          </div>
        </div>
        <div class="box-info-item">
          <div class="info-container">
            <h2>Sài Gòn</h2>
            <div class="info-row">
              <p>Giá trung bình tháng 5</p>
              <p>157.000/m2</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 4/2023</p>
              <p>-5.5%</p>
            </div>
            <div class="info-row">
              <p>Giá so với tháng 5/2022</p>
              <p>8.3%</p>
            </div>
            <div class="detail-btn">
              <button>Xem chi tiết <i class="bx bx-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="@/assets/styles/client/analysis.css"></style>
