<template>
  <main id="dashboard" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Bảng điều khiển</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Bảng điều khiển</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <ul class="box-info">
      <li>
        <i class="bx bxs-calendar-check"></i>
        <span class="text">
          <h3>{{ boxInfo.totalPost }}</h3>
          <p>Tin đang hiển thị</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-group"></i>
        <span class="text">
          <h3>{{ boxInfo.totalUser }}</h3>
          <p>Người dùng</p>
        </span>
      </li>
      <li>
        <i class="bx bxs-dollar-circle"></i>
        <span class="text">
          <h3 class="price">{{ toVnd(boxInfo.totalIncome) }}</h3>
          <p>Thu nhập trong tháng</p>
        </span>
      </li>
    </ul>

    <div class="table-data">
      <div class="post">
        <h3 class="head-title">Tin chưa duyệt ({{ post.unconfirmed.length }})</h3>
        <el-table
          :data="post.unconfirmed"
          stripe
          :default-sort="{ prop: 'id' }"
          style="width: 100%"
          height="300"
          max-height="300"
          cell-class-name="table-cell"
          header-cell-class-name="table-cell"
        >
          <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
            <template #default="scope">
              <img v-if="scope.row.medias.length" :src="scope.row.medias[0].url" class="avatar" />
            </template>
          </el-table-column>
          <el-table-column label="Tiêu đề" prop="title" width="300" />
          <el-table-column
            prop="catalog.name"
            label="Danh mục"
            width="200"
            :filters="catalog.filter"
            :filter-method="filterCatalog"
            filter-placement="bottom"
          />
          <el-table-column label="Giá" prop="price" sortable width="120">
            <template #default="scope">
              <span>{{ toVnd(scope.row.price) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="package">
        <h3 class="head-title">Gói đăng tin</h3>
        <ul class="package-list">
          <li class="package-item-dashboard vip1">
            <p>VIP 1</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item-dashboard vip2">
            <p>VIP 2</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item-dashboard vip3">
            <p>VIP 3</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item-dashboard vip4">
            <p>VIP 4</p>
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </li>
          <li class="package-item-dashboard normal">
            <p>Normal</p>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import UserService from '@/services/UserService';
import PostService from '@/services/PostService';
import { STATUS } from '@/common/postStatuses';
import { isExpired } from '@/utils/isExpired';
import { toVnd } from '@/utils/numberFormatter';
import CatalogService from '@/services/CatalogService';
import TransactionService from '@/services/TransactionService';
export default {
  props: {
    changePage: Function,
  },
  data() {
    return {
      boxInfo: {
        totalPost: 0,
        totalUser: 0,
        totalIncome: 0,
      },
      post: {
        unconfirmed: [],
      },
      catalog: {
        filter: [],
      },
    };
  },
  mounted() {
    this.changePage(1);
    this.getTotalUser();
    this.getPosts();
    this.getTransactions();
    this.getCatalogs();
  },
  methods: {
    toVnd,
    async getTotalUser() {
      const res = await UserService.getUsers();
      if (res.status === 200) {
        this.boxInfo.totalUser = res.data.total_user;
      }
    },
    async getPosts() {
      const res = await PostService.getPosts();
      if (res.status === 200) {
        this.post.unconfirmed = res.data.filter(post => post.status === STATUS.UNCONFIRMED);
        this.boxInfo.totalPost = res.data.filter(
          post => post.status === STATUS.PUBLIC && !isExpired(post.expired_at),
        ).length;
      }
    },
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalog.filter = res.data.map(catalog => {
          return {
            text: catalog.name,
            value: catalog.id,
          };
        });
      }
    },
    async getTransactions() {
      const res = await TransactionService.getTransactions();
      if (res.status === 200) {
        this.boxInfo.totalIncome = this.getMonthTotal(res.data);
      }
    },
    getMonthTotal(list) {
      const now = new Date();
      const monthAmount = list.reduce((accumulator, currentValue) => {
        const time = new Date(currentValue.created_at);
        if (time.getMonth() === now.getMonth() && time.getFullYear() === now.getFullYear()) {
          return accumulator + currentValue.money;
        }
        return accumulator;
      }, 0);
      if (monthAmount) {
        return monthAmount;
      }
      return 0;
    },
    filterCatalog(value, row) {
      return row.catalog.id === value;
    },
  },
};
</script>

<style src="@/assets/styles/admin/dashboard.css"></style>
