<template>
  <main id="post-management" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Quản lý tin đăng</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Quản lý tin đăng</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="btn-group">
        <button class="btn-create" @click="triggerCreatePostDialog(true)">
          <i class="bx bxs-plus-circle"></i>
          <span class="text">Tạo bài đăng</span>
        </button>
        <button class="btn-download">
          <i class="bx bxs-cloud-download"></i>
          <span class="text">Download CSV</span>
        </button>
      </div>
    </div>

    <div class="tab-container">
      <el-tabs>
        <el-tab-pane label="Tin đang hiển thị">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin đang hiển thị</h3>
              <div class="operations">
                <el-button type="danger">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              max-height="1000"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img :src="scope.row.avatar" class="avatar" />
                </template>
              </el-table-column>
              <el-table-column label="Tiêu đề" prop="title" width="300" />
              <el-table-column label="Giá" prop="price" sortable width="120">
                <template #default="scope">
                  <span>{{ numberToVND(scope.row.price) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ numberToVND(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày bắt đầu" prop="start" sortable width="180" />
              <el-table-column label="Ngày kết thúc" prop="end" sortable width="180" />
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                      >Xem</el-button
                    >
                    <el-button
                      size="small"
                      type="warning"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Sửa</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >Xóa</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tin chưa duyệt">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin chưa duyệt</h3>
              <div class="operations">
                <el-button type="primary">Duyệt tất cả</el-button>
                <el-button type="danger">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
              stripe
              style="width: 100%"
              max-height="1000"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img :src="scope.row.avatar" class="avatar" />
                </template>
              </el-table-column>
              <el-table-column label="Tiêu đề" prop="title" width="300" />
              <el-table-column label="Giá" prop="price" sortable width="120">
                <template #default="scope">
                  <span>{{ numberToVND(scope.row.price) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ numberToVND(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày tạo" prop="created_at" sortable width="180" />
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                      >Xem</el-button
                    >
                    <el-button
                      size="small"
                      type="primary"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Duyệt</el-button
                    >
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >Xóa</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination small background layout="prev, pager, next" :total="50" class="mt-4" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Danh mục tin">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Danh mục tin đăng</h3>
              <div class="operations">
                <el-button @click="openCreateCatalogDialog()" type="primary">
                  Tạo danh mục
                </el-button>
              </div>
            </div>
            <ul class="list-catalog">
              <li v-for="item in catalog.list" :key="item.id" class="catalog-item">
                <div class="catalog-info">
                  <div class="general-info">
                    <h3 class="catalog-name">{{ item.name }}</h3>
                    <span class="catalog-created-at">
                      <i class="bx bx-time"></i> Tạo lúc:
                      <strong>{{ dateTimeFormatter(item.created_at) }}</strong>
                    </span>
                  </div>
                  <ul class="numbers-info">
                    <li>
                      Tổng số tin: <strong>{{ item.total_count }}</strong>
                    </li>
                    <li>
                      Số tin đang hiển thị: <strong>{{ item.total_public_post }}</strong>
                    </li>
                    <li>
                      Số tin đã hết hạn: <strong>{{ item.total_expired_post }}</strong>
                    </li>
                    <li>
                      Số tin bị từ chối: <strong>{{ item.total_denied_post }}</strong>
                    </li>
                    <li>
                      Số tin chưa thanh toán: <strong>{{ item.total_unpaid_post }}</strong>
                    </li>
                    <li>
                      Số tin chưa duyệt: <strong>{{ item.total_unconfirmed_post }}</strong>
                    </li>
                  </ul>
                </div>
                <div class="catalog-operations">
                  <el-tooltip content="Chỉnh sửa danh mục" placement="top" effect="light">
                    <el-button @click="openUpdateCatalogDialog(item)" type="warning" circle>
                      <i class="bx bx-edit-alt"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Xóa danh mục" placement="top" effect="light">
                    <el-button type="danger" circle><i class="bx bx-trash"></i></el-button>
                  </el-tooltip>
                </div>
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <catalog-dialog
      :dialogVisible="dialogVisible.catalog"
      :getCatalogs="getCatalogs"
      :catalog="catalog.catalog"
      @triggerDialog="triggerCatalogDialog"
    />

    <create-post-dialog
      :dialogVisible="dialogVisible.createPost"
      @triggerDialog="triggerCreatePostDialog"
      :getPosts="getPosts"
    />
  </main>
</template>

<script>
import numberToVND from '@/utils/numberToVND';
import CatalogService from '@/services/CatalogService';
import CatalogDialog from '@/components/admin/CatalogDialog';
import { dateTimeFormatter } from '@/utils/dateFormatter';
import CreatePostDialog from '@/components/admin/CreatePostDialog';
import PostService from '@/services/PostService';
import { STATUS } from '@/common/postStatuses';
export default {
  props: {
    changePage: Function,
  },
  components: {
    CatalogDialog,
    CreatePostDialog,
  },
  data() {
    return {
      post: {
        all: [],
        public: [],
        expired: [],
        denied: [],
        unpaid: [],
        unconfirmed: [],
      },
      catalog: {
        list: [],
        catalog: null,
      },
      dialogVisible: {
        catalog: false,
        createPost: false,
      },
    };
  },
  mounted() {
    this.changePage(2);
    this.getCatalogs();
    this.getPosts();
  },
  computed: {},
  methods: {
    dateTimeFormatter,
    numberToVND,
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalog.list = res.data;
      }
    },
    triggerCatalogDialog(value) {
      this.dialogVisible.catalog = value;
    },
    triggerCreatePostDialog(value) {
      this.dialogVisible.createPost = value;
    },
    openCreateCatalogDialog() {
      this.catalog.catalog = null;
      this.triggerCatalogDialog(true);
    },
    openUpdateCatalogDialog(item) {
      this.catalog.catalog = item;
      this.triggerCatalogDialog(true);
    },
    async getPosts() {
      const res = await PostService.getPosts();
      if (res.status === 200) {
        this.post.all = res.data;
        this.post.public = this.post.all.filter(post => post.status === STATUS.PUBLIC);
        this.post.expired = this.post.all.filter(post => post.status === STATUS.EXPiRED);
        this.post.denied = this.post.all.filter(post => post.status === STATUS.DENIED);
        this.post.unpaid = this.post.all.filter(post => post.status === STATUS.UNPAID);
        this.post.unconfirmed = this.post.all.filter(post => post.status === STATUS.UNCONFIRMED);
      }
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
