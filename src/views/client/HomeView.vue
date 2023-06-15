<template>
  <div id="home" class="main-container">
    <section id="filter">
      <div class="filter-body">
        <div class="filter-item" @click="triggerCatalogDialog(true)">
          <i class="bx bx-building-house"></i>
          <span>{{ filterCatalogText }}</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item" @click="triggerAddressDialog(true)">
          <i class="bx bx-map"></i>
          <span>{{ filterAddressText }}</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item" @click="triggerPriceDialog(true)">
          <i class="bx bx-purchase-tag"></i>
          <span>{{ filterPriceText }}</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <div class="filter-item" @click="triggerAcreageDialog(true)">
          <i class="bx bx-area"></i>
          <span>{{ filterAcreageText }}</span>
          <i class="bx bxs-tag-x"></i>
        </div>
        <button @click="filterPosts()">
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
        <label @click="setLocation('Thành phố Hồ Chí Minh')">
          <div class="location-bg hcm"></div>
          <span>Hồ Chí Minh</span>
        </label>
      </div>
      <div class="location-item">
        <label @click="setLocation('Thành phố Hà Nội')">
          <div class="location-bg hn"></div>
          <span>Hà Nội</span>
        </label>
      </div>
      <div class="location-item">
        <label @click="setLocation('Thành phố Đà Nẵng')">
          <div class="location-bg dn"></div>
          <span>Đà Nẵng</span>
        </label>
      </div>
    </section>

    <div id="content" class="content-container">
      <div class="left-col">
        <section id="post-list" class="section">
          <h2 class="section-header">Danh sách tin đăng</h2>
          <div class="post-sort">
            <span>Sắp xếp: </span>
            <button
              :class="isDefaultSort ? 'sort-item active' : 'sort-item'"
              @click="defaultSort()"
            >
              Mặc định
            </button>
            <button :class="isDefaultSort ? 'sort-item' : 'sort-item active'" @click="newestSort()">
              Mới nhất
            </button>
          </div>
          <ul class="list-container">
            <main-post
              v-for="post in postPage"
              :key="post.id"
              :post="post"
              :setChatUser="setChatUser"
            />
          </ul>
        </section>
        <section id="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="post.pagination.size"
            v-model:current-page="post.pagination.page"
            :total="post.pagination.total"
          />
        </section>
      </div>
      <div class="right-col">
        <section id="catalog" class="section link">
          <h2 class="section-header">Danh mục cho thuê</h2>
          <ul class="list">
            <li
              v-for="catalog in catalog.list"
              :key="catalog.id"
              class="list-item"
              @click="setCatalog(catalog.id)"
            >
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>{{ catalog.name }}
              </span>
              <span class="count">({{ catalog.total_public_post }})</span>
            </li>
          </ul>
        </section>

        <section id="price" class="section link">
          <h2 class="section-header">Xem theo giá</h2>
          <ul class="list price">
            <li
              v-for="(item, index) in priceRange"
              :key="index"
              class="list-item"
              @click="setPrice(item.value)"
            >
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                {{ item.label }}
              </span>
            </li>
          </ul>
        </section>

        <section id="acreage" class="section link">
          <h2 class="section-header">Xem theo diện tích</h2>
          <ul class="list acreage">
            <li
              v-for="(item, index) in acreageRange"
              :key="index"
              class="list-item"
              @click="setAcreage(item.value)"
            >
              <span class="item-title">
                <i class="bx bx-chevron-right"></i>
                {{ item.label }}
              </span>
            </li>
          </ul>
        </section>

        <section id="new-post" class="section link">
          <h2 class="section-header">Tin mới đăng</h2>
          <ul class="list-container">
            <aside-post v-for="post in post.newest" :key="post.id" :post="post" />
          </ul>
        </section>

        <!-- <section id="blog" class="section link">
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
        </section> -->
      </div>
    </div>
  </div>

  <catalog-dialog
    :dialogVisible="dialogVisible.catalog"
    :filterCatalog="filter.catalog"
    @triggerDialog="triggerCatalogDialog"
    @triggerFilterCatalog="triggerFilterCatalog"
    :catalogs="catalog.list"
  />

  <address-dialog
    :dialogVisible="dialogVisible.address"
    :filterProvince="filter.address.province"
    :filterDistrict="filter.address.district"
    :filterWard="filter.address.ward"
    @triggerDialog="triggerAddressDialog"
    @triggerFilterProvince="triggerFilterProvince"
    @triggerFilterDistrict="triggerFilterDistrict"
    @triggerFilterWard="triggerFilterWard"
  />

  <price-dialog
    :dialogVisible="dialogVisible.price"
    :filterPrice="filter.price.range"
    :activeFilterPrice="activeFilterPrice"
    @triggerDialog="triggerPriceDialog"
    @triggerFilterPrice="triggerFilterPrice"
  />

  <acreage-dialog
    :dialogVisible="dialogVisible.acreage"
    :filterAcreage="filter.acreage.range"
    :activeFilterAcreage="activeFilterAcreage"
    @triggerDialog="triggerAcreageDialog"
    @triggerFilterAcreage="triggerFilterAcreage"
  />
</template>

<script>
import CatalogDialog from '@/components/client/filter/CatalogDialog';
import AddressDialog from '@/components/client/filter/AddressDialog';
import PriceDialog from '@/components/client/filter/PriceDialog';
import AcreageDialog from '@/components/client/filter/AcreageDialog';
import MainPost from '@/components/client/post/MainPost';
import AsidePost from '@/components/client/post/AsidePost';
import CatalogService from '@/services/CatalogService';
import { toVndString } from '@/utils/numberFormatter';
import PostService from '@/services/PostService';
import { TYPE } from '@/common/postTypes.js';
import { PRICE_RANGE } from '@/common/filterPriceRange';
import { ACREAGE_RANGE } from '@/common/filterAcreageRange';
import { ElLoading } from 'element-plus';

export default {
  props: {
    setChatUser: Function,
  },
  components: {
    CatalogDialog,
    AddressDialog,
    PriceDialog,
    AcreageDialog,
    MainPost,
    AsidePost,
  },
  data() {
    return {
      dialogVisible: {
        catalog: false,
        address: false,
        price: false,
        acreage: false,
      },
      catalog: {
        list: [],
      },
      priceRange: [],
      acreageRange: [],
      post: {
        list: [],
        newest: [],
        filter: [],
        pagination: {
          size: 20,
          total: 10,
          page: 1,
        },
      },
      filter: {
        catalog: 0,
        address: {
          province: '',
          district: '',
          ward: '',
        },
        price: {
          range: [0, 15000000],
          isActive: false,
        },
        acreage: {
          range: [0, 90],
          isActive: false,
        },
      },
      isDefaultSort: true,
      dataReady: false,
    };
  },
  mounted() {
    this.loading();
    this.priceRange = PRICE_RANGE;
    this.acreageRange = ACREAGE_RANGE;
    this.getCatalogs();
    this.getPublicPosts();
  },
  computed: {
    filterCatalogText() {
      if (!this.filter.catalog) {
        return 'Tất cả danh mục';
      } else {
        return this.catalog.list.find(catalog => catalog.id === this.filter.catalog).name;
      }
    },
    filterAddressText() {
      if (!this.filter.address.province) {
        return 'Toàn quốc';
      } else if (!this.filter.address.district) {
        return `${this.filter.address.province}`;
      } else if (!this.filter.address.ward) {
        return `${this.filter.address.province}, ${this.filter.address.district}`;
      } else {
        return `${this.filter.address.province}, ${this.filter.address.district}, ${this.filter.address.ward}`;
      }
    },
    filterPriceText() {
      if (!this.filter.price.isActive) {
        return 'Chọn giá';
      }
      if (
        this.filter.price.range[0] === this.filter.price.range[1] &&
        this.filter.price.range === 15000000
      ) {
        return `Trên ${toVndString(this.filter.price.range[0])}`;
      } else if (this.filter.price.range[0] === this.filter.price.range[1]) {
        return `${toVndString(this.filter.price.range[0])}`;
      } else {
        return `${toVndString(this.filter.price.range[0])} - ${toVndString(
          this.filter.price.range[1],
        )}`;
      }
    },
    filterAcreageText() {
      if (!this.filter.acreage.isActive) {
        return 'Chọn diện tích';
      }
      if (
        this.filter.acreage.range[0] === this.filter.acreage.range[1] &&
        this.filter.acreage.range[0] === 90
      ) {
        return `Trên ${this.filter.acreage.range[0]}m²`;
      } else if (this.filter.acreage.range[0] === this.filter.acreage.range[1]) {
        return `${this.filter.acreage.range[0]}m²`;
      } else {
        return `${this.filter.acreage.range[0]}m² - ${this.filter.acreage.range[1]}m²`;
      }
    },
    postPage() {
      const startIndex = (this.post.pagination.page - 1) * this.post.pagination.size;
      const endIndex = this.post.pagination.page * this.post.pagination.size;
      return this.post.filter.slice(startIndex, endIndex);
    },
  },
  methods: {
    toVndString,
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalog.list = res.data;
      } else {
        this.dataReady = true;
      }
    },
    async getPublicPosts() {
      const res = await PostService.getPublicPosts();
      if (res.status === 200) {
        this.post.list = res.data;
        this.post.newest = res.data.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
        if (this.post.newest.length > 10) {
          this.post.newest = this.post.newest.slice(0, 10);
        }
        this.post.filter = this.post.list;
        this.post.pagination.total = this.post.list.length;
        this.defaultSort();
        this.dataReady = true;
      } else {
        this.dataReady = true;
      }
    },
    filterPosts() {
      var filterList = this.post.list.filter(
        p =>
          p.address.province.includes(this.filter.address.province) &&
          p.address.district.includes(this.filter.address.district) &&
          p.address.ward.includes(this.filter.address.ward),
      );
      if (this.filter.catalog) {
        filterList = filterList.filter(p => p.catalog.id === this.filter.catalog);
      }
      if (this.filter.price.isActive) {
        if (this.filter.price.range[0] === 15000000 && this.filter.price.range[1] === 15000000) {
          filterList = filterList.filter(p => p.price > this.filter.price.range[0]);
        } else {
          filterList = filterList.filter(
            p => p.price >= this.filter.price.range[0] && p.price <= this.filter.price.range[1],
          );
        }
      }
      if (this.filter.acreage.isActive) {
        if (this.filter.acreage.range[0] === 90 && this.filter.acreage.range[1] === 90) {
          filterList = filterList.filter(p => p.acreage > this.filter.acreage.range[0]);
        } else {
          filterList = filterList.filter(
            p =>
              p.acreage >= this.filter.acreage.range[0] &&
              p.acreage <= this.filter.acreage.range[1],
          );
        }
      }
      this.post.filter = filterList;
      if (this.isDefaultSort) {
        this.defaultSort();
      } else {
        this.newestSort();
      }
    },
    setLocation(location) {
      this.filter.address.province = location;
      this.filter.address.district = '';
      this.filter.address.ward = '';
      this.filterPosts();
    },
    setCatalog(id) {
      this.filter.catalog = id;
      this.filterPosts();
    },
    setPrice(range) {
      this.filter.price.isActive = true;
      this.filter.price.range = range;
      this.filterPosts();
    },
    setAcreage(range) {
      this.filter.acreage.isActive = true;
      this.filter.acreage.range = range;
      this.filterPosts();
    },
    defaultSort() {
      this.isDefaultSort = true;
      const vip1 = this.post.filter.filter(post => post.type === TYPE.VIP_1);
      const vip2 = this.post.filter.filter(post => post.type === TYPE.VIP_2);
      const vip3 = this.post.filter.filter(post => post.type === TYPE.VIP_3);
      const vip4 = this.post.filter.filter(post => post.type === TYPE.VIP_4);
      const normal = this.post.filter.filter(post => post.type === TYPE.NORMAL);
      this.post.filter = [].concat(vip1, vip2, vip3, vip4, normal);
    },
    newestSort() {
      this.isDefaultSort = false;
      this.post.filter.sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at));
    },
    triggerCatalogDialog(value) {
      this.dialogVisible.catalog = value;
    },
    triggerFilterCatalog(value) {
      this.filter.catalog = value;
    },
    triggerAddressDialog(value) {
      this.dialogVisible.address = value;
    },
    triggerFilterProvince(value) {
      this.filter.address.province = value;
    },
    triggerFilterDistrict(value) {
      this.filter.address.district = value;
    },
    triggerFilterWard(value) {
      this.filter.address.ward = value;
    },
    triggerPriceDialog(value) {
      this.dialogVisible.price = value;
    },
    triggerFilterPrice(value) {
      this.filter.price.range = value;
    },
    activeFilterPrice() {
      this.filter.price.isActive = true;
    },
    triggerAcreageDialog(value) {
      this.dialogVisible.acreage = value;
    },
    triggerFilterAcreage(value) {
      this.filter.acreage.range = value;
    },
    activeFilterAcreage() {
      this.filter.acreage.isActive = true;
    },
  },
  watch: {
    dataReady() {
      this.loading();
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/home.css"></style>
