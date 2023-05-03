<template>
  <div id="details-post" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }"
          >Phòng trọ cao cấp tại Quận Tân Bình</el-breadcrumb-item
        >
      </el-breadcrumb>
    </section>

    <div id="content" class="content-container">
      <div class="left-col">
        <section id="post-img">
          <swiper
            :pagination="{
              type: 'progressbar',
            }"
            :navigation="true"
            :modules="modules"
            class="img-container"
          >
            <swiper-slide>
              <div class="swiper-item">
                <img
                  src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2020/09/02/20200523-125927_1599042543.jpg"
                />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-item">
                <img
                  src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2019/01/03/0fb7ef5e-09a9-4a91-9555-853d3ff7bbab_1546511380.jpg"
                />
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="swiper-item">
                <img
                  src="https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2019/01/03/10c71ba1-4f83-47fc-8a8b-7a6839261619_1546511398.jpg"
                />
              </div>
            </swiper-slide>
          </swiper>
        </section>

        <article id="the-post">
          <header id="post-header">
            <h1 class="post-title vip-1">
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
              PHÒNG TRỌ CAO CẤP TẠI QUẬN TÂN BÌNH
            </h1>
            <div class="row">
              <div class="post-attribute">
                <div class="attribute-item price">
                  <i class="bx bx-purchase-tag bx-flip-horizontal"></i>
                  <span>3.5 triệu/tháng</span>
                </div>
                <div class="attribute-item acreage">
                  <i class="bx bx-area"></i>
                  <span>22m²</span>
                </div>
                <div class="attribute-item time">
                  <i class="bx bx-time"></i>
                  <span>Hôm nay</span>
                </div>
              </div>
              <div class="post-action">
                <div class="action-item share">
                  <i class="bx bx-share bx-flip-horizontal"></i>
                  <span>Chia sẻ</span>
                </div>
                <div class="action-item save">
                  <i class="bx bx-heart"></i>
                  <span>Lưu tin</span>
                </div>
              </div>
            </div>
            <div class="post-address">
              <i class="bx bxs-map"></i>
              <span>202 Đường Phạm Văn Hai, Phường 4, Quận Tân Bình, Hồ Chí Minh</span>
            </div>
          </header>

          <section id="post-summary" class="post-section">
            <h2 class="section-title">Thông tin mô tả</h2>
            <p class="summary-content">{{ text }}</p>
          </section>

          <section id="post-overview" class="post-section">
            <h2 class="section-title">Đặc điểm tin đăng</h2>
            <table>
              <tbody>
                <tr>
                  <td class="name">Khu vực:</td>
                  <td>Thành phố Đà Nẵng</td>
                </tr>
                <tr>
                  <td class="name">Loại tin rao:</td>
                  <td>Phòng trọ, nhà trọ</td>
                </tr>
                <tr>
                  <td class="name">Khu vực:</td>
                  <td>Thành phố Đà Nẵng</td>
                </tr>
                <tr>
                  <td class="name">Tiền cọc:</td>
                  <td>3.000.000 vnd</td>
                </tr>
                <tr>
                  <td class="name">Đối tượng thuê:</td>
                  <td>Tất cả</td>
                </tr>
                <tr>
                  <td class="name">Gói tin:</td>
                  <td>Tin Vip 1</td>
                </tr>
                <tr>
                  <td class="name">Ngày đăng:</td>
                  <td>Thứ 2, 21:23 01/05/2023</td>
                </tr>
                <tr>
                  <td class="name">Ngày hết hạn:</td>
                  <td>Thứ 7, 21:23 06/05/2023</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="post-contact" class="post-section">
            <h2 class="section-title">Thông tin liên hệ</h2>
            <table>
              <tbody>
                <tr>
                  <td class="name">Liên hệ:</td>
                  <td>Nguyễn Thanh Sang</td>
                </tr>
                <tr>
                  <td class="name">Điện thoại:</td>
                  <td>0777908037</td>
                </tr>
                <tr>
                  <td class="name">Email:</td>
                  <td>thanhsang6325@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="post-map" class="post-section">
            <h2 class="section-title">Bản đồ</h2>
            <div class="post-address">
              <i class="bx bxs-map"></i>
              <span>202 Đường Phạm Văn Hai, Phường 4, Quận Tân Bình, Hồ Chí Minh</span>
            </div>
            <div class="map-content">
              <iframe
                class="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8362568392113!2d108.15079177460005!3d16.07398463931167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d76b1a334f%3A0xeca62349bfbee122!2zNjAgxJAuIE5nLiBTxKkgTGnDqm4sIEhvw6AgS2jDoW5oIELhuq9jLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1683031780212!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </article>
      </div>
      <div class="right-col">
        <section id="author">
          <div class="author-avt">
            <img src="@/assets/images/default/default-user.png" />
          </div>
          <span class="author-name"> Nguyễn Thanh Sang </span>
          <div class="author-status">
            <div class="dot"></div>
            <span>Đang hoạt động</span>
          </div>
          <button class="phone">
            <i class="bx bxs-phone"></i>
            <span>0777908037</span>
          </button>
          <button class="chat">
            <i class="bx bxs-message-alt-detail"></i>
            <span>Nhắn tin</span>
          </button>
          <button class="user-page">
            <i class="bx bxs-user-account"></i>
            <span>Trang cá nhân</span>
          </button>
        </section>

        <section id="vip-post" class="section link">
          <h2 class="section-header">Tin nổi bật</h2>
          <ul class="list-container">
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
          </ul>
        </section>

        <section id="new-post" class="section link">
          <h2 class="section-header">Tin mới đăng</h2>
          <ul class="list-container">
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
            <AsidePost />
          </ul>
        </section>
      </div>
    </div>

    <Support />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper';
import AsidePost from '@/components/client/post/AsidePost.vue';
import Support from '@/components/client/SupportSection';
export default {
  data() {
    return {
      text: 'Giá 3tr/tháng \nCách sân bay Tân Sơn Nhất 3 phút đi xe máy \nCách chợ Phạm Văn Hai 1 phút xe máy\nRất gần Quận 1 và Quận 3 : di chuyển thuận lợi bằng đường Hoàng Sa Trường Sa.\nTiện ích xung quanh gồm Biện Viện, Trường Học, Chợ, Siêu Thị, Nằm rất gần bờ kè kênh Nhiêu Lộc nên rất thuận tiện đi làm về giờ tan tầm, tránh được kẹt xe.\nDiện tích mỗi phòng từ 25m2 đến 27m2 có tầng lửng cho bạn không gian sống riêng tư cho dù bạn là gia đình nhỏ hay nhóm bạn ở chung\nKhu vực an ninh, yên tĩnh, thuận tiện trong mọi sinh hoạt\nCó bãi gửi xe riêng cho không gian sống them rộng mở.\nBảo vệ an ninh 24/7 bảo đảm cho bạn và tài sản của bạn.\nDịch vụ linh hoạt tùy thuộc vào nhu cầu của bạn.\nKhông gian RIÊNG TƯ, YÊN TĨNH, TỰ DO, không bị ai làm phiền.\nBạn được TỰ DO TIẾP KHÁCH người thân, bạn bè.\nVệ sinh sạch sẽ không gian sử dụng chung 24/7\nĐịa chỉ liên hệ : 380/290A Phạm Văn Hai (Đi vào bằng hẻm 202 Phạm Văn Hai)\nVui Lòng Liên Hệ Số Điện Thoại : 0909913596 cô Linh để xem phòng\n0796252354 Đạt\nHoặc 08.8899.2345 khánh',
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    AsidePost,
    Support,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
};
</script>

<style scoped src="@/assets/styles/detail.css"></style>
