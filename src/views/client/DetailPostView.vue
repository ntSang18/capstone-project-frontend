<template>
  <div id="details-post" class="main-container">
    <section v-if="post.detail" id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">{{ post.detail.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <div id="content" class="content-container">
      <div class="left-col">
        <section v-if="post.detail" id="post-img">
          <swiper
            :pagination="{
              type: 'progressbar',
            }"
            :navigation="true"
            :modules="modules"
            class="img-container"
          >
            <swiper-slide v-for="media in this.post.detail.medias" :key="media.id">
              <div class="swiper-item">
                <img :src="media.url" />
              </div>
            </swiper-slide>
          </swiper>
        </section>

        <article v-if="post.detail" id="the-post">
          <header id="post-header">
            <h1 :class="`post-title ${className}`">
              <div v-for="n in stars" :key="n" class="stars">
                <i class="bx bxs-star"></i>
              </div>
              {{ post.detail.title }}
            </h1>
            <div class="row">
              <div class="post-attribute">
                <div class="attribute-item price">
                  <i class="bx bx-purchase-tag bx-flip-horizontal"></i>
                  <span>{{ toVndString(post.detail.price) }}/tháng</span>
                </div>
                <div class="attribute-item acreage">
                  <i class="bx bx-area"></i>
                  <span>{{ post.detail.acreage }}m²</span>
                </div>
                <div v-if="post.detail.paid_at" class="attribute-item time">
                  <i class="bx bx-time"></i>
                  <span>{{ diffTime(post.detail.paid_at) }}</span>
                </div>
              </div>
              <div v-if="post.detail.status === 'PUBLIC'" class="post-action">
                <div class="action-item share">
                  <i class="bx bx-share bx-flip-horizontal"></i>
                  <span>Chia sẻ</span>
                </div>
                <div
                  :class="isSaved ? 'action-item save active' : 'action-item save'"
                  @click="savePost()"
                >
                  <i class="bx bx-heart"></i>
                  <span v-if="isSaved">Bỏ lưu</span>
                  <span v-else>Lưu tin</span>
                </div>
              </div>
            </div>
            <div class="post-address">
              <i class="bx bxs-map"></i>
              <span>{{ strAddress() }}</span>
            </div>
          </header>

          <section id="post-summary" class="post-section">
            <h2 class="section-title">Thông tin mô tả</h2>
            <p class="summary-content">{{ post.detail.description }}</p>
          </section>

          <section id="post-overview" class="post-section">
            <h2 class="section-title">Đặc điểm tin đăng</h2>
            <table>
              <tbody>
                <tr>
                  <td class="name">Mã tin:</td>
                  <td>#{{ post.detail.id }}</td>
                </tr>
                <tr>
                  <td class="name">Loại tin rao:</td>
                  <td>{{ post.detail.catalog.name }}</td>
                </tr>
                <tr>
                  <td class="name">Khu vực:</td>
                  <td>{{ post.detail.address.province }}</td>
                </tr>
                <tr>
                  <td class="name">Tiền cọc:</td>
                  <td>{{ toVndString(post.detail.deposit) }}</td>
                </tr>
                <tr>
                  <td class="name">Đối tượng thuê:</td>
                  <td>{{ strTarget() }}</td>
                </tr>
                <tr>
                  <td class="name">Gói tin:</td>
                  <td>{{ typeString }}</td>
                </tr>
                <tr v-if="post.detail.paid_at">
                  <td class="name">Ngày đăng:</td>
                  <td>{{ dateFormatter(post.detail.paid_at) }}</td>
                </tr>
                <tr v-if="post.detail.expired_at">
                  <td class="name">Ngày hết hạn:</td>
                  <td>{{ dateFormatter(post.detail.expired_at) }}</td>
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
                  <td>{{ post.detail.user.username }}</td>
                </tr>
                <tr>
                  <td class="name">Điện thoại:</td>
                  <td>{{ post.detail.user.phone_number }}</td>
                </tr>
                <tr>
                  <td class="name">Email:</td>
                  <td>{{ post.detail.user.email }}</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section v-if="post.detail" id="post-map" class="post-section">
            <h2 class="section-title">Bản đồ</h2>
            <div class="post-address">
              <i class="bx bxs-map"></i>
              <span>{{ strAddress() }}</span>
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
        <section v-if="post.detail" id="author">
          <div class="author-avt">
            <img v-if="post.detail.user.image_url" :src="post.detail.user.image_url" />
            <img v-else src="@/assets/images/default/default-user.png" />
          </div>
          <span class="author-name"> {{ post.detail.user.username }} </span>
          <div v-if="firebaseUser[1].availability" class="author-status">
            <div class="dot"></div>
            <span>Đang hoạt động</span>
          </div>
          <div v-else class="author-status">
            <div class="dot off"></div>
            <span>Hoạt động {{ diffTime(firebaseUser[1].timeStamp) }}</span>
          </div>
          <button class="phone">
            <i class="bx bxs-phone"></i>
            <span>{{ post.detail.user.phone_number }}</span>
          </button>
          <button class="chat" @click="chat(post.detail.user)">
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
            <aside-post v-for="post in post.vip" :key="post.id" :post="post" />
          </ul>
        </section>

        <section id="new-post" class="section link">
          <h2 class="section-header">Tin mới đăng</h2>
          <ul class="list-container">
            <aside-post v-for="post in post.newest" :key="post.id" :post="post" />
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper';
import AsidePost from '@/components/client/post/AsidePost.vue';
import PostService from '@/services/PostService';
import { TYPE } from '@/common/postTypes.js';
import { toVndString } from '@/utils/numberFormatter';
import { dateFormatter, diffTime } from '@/utils/dateFormatter';
import { TARGETS } from '@/common/postTargets';
import { ElLoading } from 'element-plus';
import { mapActions, mapState } from 'vuex';
import { database, ref, onValue } from '@/services/FirebaseService';
export default {
  props: {
    setChatUser: Function,
  },
  data() {
    return {
      post: {
        detail: null,
        newest: [],
        vip: [],
      },
      firebaseUser: [],
      stars: 0,
      className: '',
      typeString: '',
      dataReady: false,
      isSaved: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    AsidePost,
  },
  async mounted() {
    await this.getPost();
    await this.getPublicPosts();
    this.dataReady = true;
    this.setup();
    this.checkSaved();
  },
  computed: {
    ...mapState('client', ['user', 'savedPosts']),
  },
  methods: {
    ...mapActions('client', ['addSavedPost', 'removeSavedPost']),
    toVndString,
    diffTime,
    dateFormatter,
    loading() {
      const loading = ElLoading.service({
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      if (this.dataReady) {
        loading.close();
      }
    },
    async getPublicPosts() {
      const res = await PostService.getPublicPosts();
      if (res.status === 200) {
        this.post.newest = res.data.sort((a, b) => new Date(a.paid_at) - new Date(b.paid_at));
        if (this.post.newest.length > 10) {
          this.post.newest = this.post.newest.slice(0, 10);
        }
        const vip1 = res.data.filter(post => post.type === TYPE.VIP_1);
        const vip2 = res.data.filter(post => post.type === TYPE.VIP_2);
        const vip3 = res.data.filter(post => post.type === TYPE.VIP_3);
        const vip4 = res.data.filter(post => post.type === TYPE.VIP_4);
        const normal = res.data.filter(post => post.type === TYPE.NORMAL);
        this.post.vip = [].concat(vip1, vip2, vip3, vip4, normal);
        if (this.post.vip.length > 10) {
          this.post.vip = this.post.vip.slice(0, 10);
        }
      }
    },
    async getPost() {
      this.loading();
      const res = await PostService.getPost(this.$route.params.id);
      if (res.status === 200) {
        this.post.detail = res.data;
        this.getFirebaseUser();
      }
    },
    getFirebaseUser() {
      onValue(ref(database, 'users'), snapshot => {
        if (snapshot.exists()) {
          const firebaseUsers = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
          this.firebaseUser = firebaseUsers.find(el => el[1].id === this.post.detail.user.id);
        }
      });
    },
    setup() {
      if (this.post.detail.type === TYPE.VIP_1) {
        this.className = 'vip-1';
        this.typeString = 'Tin vip 1';
        this.stars = 5;
      } else if (this.post.detail.type === TYPE.VIP_2) {
        this.className = 'vip-2';
        this.typeString = 'Tin vip 2';
        this.stars = 4;
      } else if (this.post.detail.type === TYPE.VIP_3) {
        this.className = 'vip-3';
        this.typeString = 'Tin vip 3';
        this.stars = 3;
      } else if (this.post.detail.type === TYPE.VIP_4) {
        this.className = 'vip-4';
        this.typeString = 'Tin vip 4';
        this.stars = 2;
      } else {
        this.className = 'normal';
        this.typeString = 'Tin thường';
        this.stars = 0;
      }
    },
    strAddress() {
      return `${this.post.detail.address.specific_address},
      ${this.post.detail.address.ward},
      ${this.post.detail.address.district},
      ${this.post.detail.address.province}`;
    },
    strTarget() {
      var target = TARGETS.find(target => target.value === this.post.detail.target);
      return target.name;
    },
    checkSaved() {
      const index = this.savedPosts.findIndex(p => p.id === this.post.detail.id);
      if (index < 0) {
        this.isSaved = false;
      } else {
        this.isSaved = true;
      }
    },
    savePost() {
      if (this.isSaved) {
        this.removeSavedPost(this.post.detail);
        this.isSaved = false;
      } else {
        this.addSavedPost(this.post.detail);
        this.isSaved = true;
      }
    },
    chat(user) {
      if (!this.user) {
        this.$router.push('/login');
      } else {
        if (this.user.id !== user.id) {
          this.setChatUser(user);
        }
      }
    },
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
    };
  },
  watch: {
    dataReady() {
      this.loading();
    },
    '$route.params.id'() {
      if (this.$route.params.id) {
        this.getPost();
      }
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/detail.css"></style>
