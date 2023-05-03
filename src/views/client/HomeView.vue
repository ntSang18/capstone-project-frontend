<template>
  <div id="home" class="main-container">
    <section id="filter">
      <div class="filter-body">
        <div class="filter-item">
          <i class="bx bx-building-house"></i>
          <span>Phòng trọ, nhà trọ</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item">
          <i class="bx bx-map"></i>
          <span>Toàn quốc</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item">
          <i class="bx bx-purchase-tag"></i>
          <span>Chọn giá</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item">
          <i class="bx bx-area"></i>
          <span>Chọn diện tích</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <button>
          <i class="bx bx-search"></i>
          <span>Tìm kiếm</span>
        </button>
      </div>
    </section>

    <section id="page-header">
      <h1>Cho thuê phòng trọ, giá rẻ, tiện nghi, mới nhất 2023</h1>
      <p>
        Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ
        cao cấp mới nhất năm 2023. Tất cả nhà trọ cho thuê giá tốt nhất tại việt Nam
      </p>
    </section>

    <section id="location">
      <div class="location-item">
        <input type="radio" id="city-hcm" />
        <label for="city-hcm">
          <div class="location-bg hcm"></div>
          <span>Phòng trọ Hồ Chí Minh</span>
        </label>
      </div>
      <div class="location-item">
        <input type="radio" id="city-hn" />
        <label for="city-hn">
          <div class="location-bg hn"></div>
          <span>Phòng trọ Hà Nội</span>
        </label>
      </div>
      <div class="location-item">
        <input type="radio" id="city-dn" />
        <label for="city-dn">
          <div class="location-bg dn"></div>
          <span>Phòng trọ Đà Nẵng</span>
        </label>
      </div>
    </section>

    <div id="content" class="content-container">
      <div class="left-col">
        <section id="post-list" class="section">
          <h2 class="section-header">Danh sách tin đăng</h2>
          <div class="post-sort">
            <span>Sắp xếp: </span>
            <button class="sort-item active">Mặc định</button>
            <button class="sort-item">Mới nhất</button>
            <button class="sort-item">Có video</button>
          </div>
          <ul class="list-container">
            <MainPost type="1" />
            <MainPost type="1" />
            <MainPost type="1" />
            <MainPost type="2" />
            <MainPost type="2" />
            <MainPost type="2" />
            <MainPost type="3" />
            <MainPost type="3" />
            <MainPost type="3" />
            <MainPost type="4" />
            <MainPost type="4" />
            <MainPost type="4" />
            <MainPost type="5" />
            <MainPost type="5" />
            <MainPost type="5" />
          </ul>
        </section>
        <section id="pagination">
          <el-pagination background layout="prev, pager, next" :total="1000" />
        </section>
      </div>
      <div class="right-col">
        <section id="catalog" class="section link">
          <h2 class="section-header">Danh mục cho thuê</h2>
          <ul class="list">
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>Cho thuê phòng trọ
              </span>
              <span class="count">(49.212)</span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>Cho thuê nhà nguyên căn</span
              >
              <span class="count">(49.212)</span>
            </li>
            <li class="list-item">
              <span class="item-title"> <i class="bx bx-chevron-right"></i>Cho thuê căn hộ </span>
              <span class="count">(49.212)</span>
            </li>
            <li class="list-item sub">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>Cho thuê căn hộ mini
              </span>
              <span class="count">(49.212)</span>
            </li>
            <li class="list-item sub">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>Cho thuê căn hộ dịch vụ
              </span>
              <span class="count">(49.212)</span>
            </li>
            <li class="list-item">
              <span class="item-title"> <i class="bx bx-chevron-right"></i> Tìm người ở ghép </span>
              <span class="count">(49.212)</span>
            </li>
          </ul>
        </section>

        <section id="price" class="section link">
          <h2 class="section-header">Xem theo giá</h2>
          <ul class="list price">
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Dưới 1 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 1 - 2 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 2 - 3 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 3 - 5 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 5 - 7 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 7 - 10 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 10 - 15 triệu
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Trên 15 triệu
              </span>
            </li>
          </ul>
        </section>

        <section id="acreage" class="section link">
          <h2 class="section-header">Xem theo diện tích</h2>
          <ul class="list acreage">
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Dưới 20m²
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 20 - 30m²
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 30 - 50m²
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 50 - 70m²
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Từ 70 - 90m²
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Trên 90m²
              </span>
            </li>
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

        <section id="blog" class="section link">
          <h2 class="section-header">Bài viết mới</h2>
          <ul class="list">
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Nỗi khổ của người thuê phòng trọ gần thì đắt mà xa thỉ rẻ
              </span>
            </li>
          </ul>
        </section>

        <section id="care" class="section link">
          <h2 class="section-header">Có thể bạn quan tâm</h2>
          <ul class="list">
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Mẫu hợp đồng cho thuê phòng trọ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Cẩn thận các kiểu lừa đảo khi thuê phòng trọ
              </span>
            </li>
            <li class="list-item">
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                Kinh nghiệm thuê phòng trọ sinh viên
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <Support />
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css';
import MainPost from '@/components/client/post/MainPost.vue';
import AsidePost from '@/components/client/post/AsidePost.vue';
import Support from '@/components/client/SupportSection.vue';
export default {
  components: {
    MainPost,
    AsidePost,
    Support,
  },
};
</script>

<style scoped src="@/assets/styles/home.css"></style>
