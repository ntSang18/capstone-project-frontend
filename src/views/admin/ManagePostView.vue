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
        <button class="btn-download" @click="exportCsv()">
          <i class="bx bxs-cloud-download"></i>
          <span class="text">Download CSV</span>
        </button>
      </div>
    </div>

    <div class="tab-container">
      <el-tabs>
        <!-- PUBLIC POST -->

        <el-tab-pane label="Tin đang hiển thị">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin đang hiển thị</h3>
              <div class="operations">
                <el-button type="danger" @click="deletePosts('PUBLIC')">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterPublicPage"
              stripe
              :default-sort="{ prop: 'id' }"
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChangePublic"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img
                    v-if="scope.row.medias.length"
                    :src="scope.row.medias[0].url"
                    class="avatar"
                  />
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
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ toVnd(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày bắt đầu" prop="paid" sortable width="180">
                <template #default="scope">
                  <span v-if="scope.row.paid_at">{{ dateTimeFormatter(scope.row.paid_at) }}</span>
                  <span v-else>{{ dateTimeFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày kết thúc" prop="expired_at" sortable width="180">
                <template #default="scope">
                  <span>{{ dateTimeFormatter(scope.row.expired_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="post.public.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-tooltip content="Xem chi tiết tin" placement="top" effect="light">
                      <el-button size="small" circle @click="openViewPostDialog(scope.row)">
                        <i class="bx bx-search-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sử tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="warning"
                        circle
                        @click="openUpdatePostDialog(scope.row)"
                      >
                        <i class="bx bx-edit-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tin này?"
                      @confirm="deletePost(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger" circle
                          ><i class="bx bx-trash-alt"></i
                        ></el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="post.public.pagination.size"
                v-model:current-page="post.public.pagination.page"
                :total="post.public.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- UNCONFIRMED POST -->

        <el-tab-pane label="Tin chưa duyệt">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin chưa duyệt</h3>
              <div class="operations">
                <el-button type="primary" @click="confirmPost()">Duyệt tất cả</el-button>
                <el-button type="danger" @click="deletePosts('UNCONFIRMED')">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterUnconfirmedPage"
              stripe
              :default-sort="{ prop: 'id' }"
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChangeUnconfirmed"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" width="140">
                <template #default="scope">
                  <img
                    v-if="scope.row.medias.length"
                    :src="scope.row.medias[0].url"
                    class="avatar"
                  />
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
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ toVnd(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày tạo" prop="created_at" sortable width="180">
                <template #default="scope">
                  <span>{{ dateTimeFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="post.unconfirmed.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-tooltip content="Xem chi tiết tin" placement="top" effect="light">
                      <el-button size="small" circle @click="openViewPostDialog(scope.row)">
                        <i class="bx bx-search-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Duyệt tin" placement="top" effect="light">
                      <el-button size="small" type="primary" circle @click="confirmPost(scope.row)">
                        <i class="bx bx-check"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Từ chối tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="info"
                        circle
                        @click="openDenyPostDialog(scope.row)"
                      >
                        <i class="bx bx-x"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sử tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="warning"
                        circle
                        @click="openUpdatePostDialog(scope.row)"
                      >
                        <i class="bx bx-edit-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tin này?"
                      @confirm="deletePost(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger" circle
                          ><i class="bx bx-trash-alt"></i
                        ></el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="post.unconfirmed.pagination.size"
                v-model:current-page="post.unconfirmed.pagination.page"
                :total="post.unconfirmed.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- UNPAID POST -->

        <el-tab-pane label="Tin chưa thanh toán">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin chưa thanh toán</h3>
              <div class="operations">
                <el-button type="danger" @click="deletePosts('UNPAID')">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterUnpaidPage"
              stripe
              :default-sort="{ prop: 'id' }"
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChangeUnpaid"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img
                    v-if="scope.row.medias.length"
                    :src="scope.row.medias[0].url"
                    class="avatar"
                  />
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
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ toVnd(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày tạo" prop="paid" sortable width="180">
                <template #default="scope">
                  <span>{{ dateTimeFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="post.unpaid.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-tooltip content="Xem chi tiết tin" placement="top" effect="light">
                      <el-button size="small" circle @click="openViewPostDialog(scope.row)">
                        <i class="bx bx-search-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sử tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="warning"
                        circle
                        @click="openUpdatePostDialog(scope.row)"
                      >
                        <i class="bx bx-edit-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tin này?"
                      @confirm="deletePost(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger" circle
                          ><i class="bx bx-trash-alt"></i
                        ></el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="post.unpaid.pagination.size"
                v-model:current-page="post.unpaid.pagination.page"
                :total="post.unpaid.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- DENIED POST -->

        <el-tab-pane label="Tin đã từ chối">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin đã từ chối</h3>
              <div class="operations">
                <el-button type="danger" @click="deletePosts('DENIED')">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterDeniedPage"
              stripe
              :default-sort="{ prop: 'id' }"
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChangeDenied"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img
                    v-if="scope.row.medias.length"
                    :src="scope.row.medias[0].url"
                    class="avatar"
                  />
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
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ toVnd(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày tạo" prop="paid" sortable width="180">
                <template #default="scope">
                  <span>{{ dateTimeFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="post.denied.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-tooltip content="Xem chi tiết tin" placement="top" effect="light">
                      <el-button size="small" circle @click="openViewPostDialog(scope.row)">
                        <i class="bx bx-search-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sử tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="warning"
                        circle
                        @click="openUpdatePostDialog(scope.row)"
                      >
                        <i class="bx bx-edit-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tin này?"
                      @confirm="deletePost(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger" circle>
                          <i class="bx bx-trash-alt"></i>
                        </el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="post.denied.pagination.size"
                v-model:current-page="post.denied.pagination.page"
                :total="post.denied.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- EXPIRED POST -->

        <el-tab-pane label="Tin đã hết hạn">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tin đã hết hạn</h3>
              <div class="operations">
                <el-button type="danger" @click="deletePosts('EXPIRED')">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterExpiredPage"
              stripe
              :default-sort="{ prop: 'id' }"
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChangeExpired"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Mã tin" width="90" sortable />
              <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
                <template #default="scope">
                  <img
                    v-if="scope.row.medias.length"
                    :src="scope.row.medias[0].url"
                    class="avatar"
                  />
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
              <el-table-column prop="deposit" label="Tiền cọc" width="120" sortable>
                <template #default="scope">
                  <span>{{ toVnd(scope.row.deposit) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày bắt đầu" prop="paid" sortable width="180">
                <template #default="scope">
                  <span v-if="scope.row.paid_at">{{ dateTimeFormatter(scope.row.paid_at) }}</span>
                  <span v-else>{{ dateTimeFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Ngày kết thúc" prop="expired_at" sortable width="180">
                <template #default="scope">
                  <span>{{ dateTimeFormatter(scope.row.expired_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="post.expired.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-tooltip content="Xem chi tiết tin" placement="top" effect="light">
                      <el-button size="small" circle @click="openViewPostDialog(scope.row)">
                        <i class="bx bx-search-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip content="Chỉnh sử tin" placement="top" effect="light">
                      <el-button
                        size="small"
                        type="warning"
                        circle
                        @click="openUpdatePostDialog(scope.row)"
                      >
                        <i class="bx bx-edit-alt"></i
                      ></el-button>
                    </el-tooltip>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tin này?"
                      @confirm="deletePost(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger" circle
                          ><i class="bx bx-trash-alt"></i
                        ></el-button>
                      </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="post.expired.pagination.size"
                v-model:current-page="post.expired.pagination.page"
                :total="post.expired.pagination.total"
              />
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
                  <el-popconfirm
                    width="200"
                    confirm-button-type="danger"
                    confirm-button-text="Xác nhận"
                    cancel-button-text="Hủy"
                    title="Xác nhận xóa danh mục này?"
                    @confirm="deleteCatalog(item.id)"
                  >
                    <template #reference>
                      <el-button type="danger" circle><i class="bx bx-trash"></i></el-button>
                    </template>
                  </el-popconfirm>
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
      :catalogs="catalog.list"
    />

    <view-post-dialog
      :dialogVisible="dialogVisible.viewPost"
      :post="post.dialogPost"
      @triggerDialog="triggerViewPostDialog"
    />

    <update-post-dialog
      :dialogVisible="dialogVisible.updatePost"
      :post="post.dialogPost"
      @triggerDialog="triggerUpdatePostDialog"
      :catalogs="catalog.list"
      :getPosts="getPosts"
    />

    <deny-post-dialog
      :dialogVisible="dialogVisible.denyPost"
      :post="post.dialogPost"
      @triggerDialog="triggerDenyPostDialog"
      :getPosts="getPosts"
    />
  </main>
</template>

<script>
import { toVnd } from '@/utils/numberFormatter';
import { isExpired } from '@/utils/isExpired';
import CatalogService from '@/services/CatalogService';
import CatalogDialog from '@/components/admin/catalog/CatalogDialog';
import { dateTimeFormatter } from '@/utils/dateFormatter';
import CreatePostDialog from '@/components/admin/post/CreatePostDialog';
import ViewPostDialog from '@/components/admin/post/ViewPostDialog';
import UpdatePostDialog from '@/components/admin/post/UpdatePostDialog';
import DenyPostDialog from '@/components/admin/post/DenyPostDialog';
import PostService from '@/services/PostService';
import { database, ref, push } from '@/services/FirebaseService';
import { STATUS } from '@/common/postStatuses';

export default {
  props: {
    changePage: Function,
  },

  components: {
    CatalogDialog,
    CreatePostDialog,
    ViewPostDialog,
    UpdatePostDialog,
    DenyPostDialog,
  },

  data() {
    return {
      post: {
        all: [],
        public: {
          list: [],
          search: '',
          pagination: {
            size: 20,
            total: 10,
            page: 1,
          },
        },
        expired: {
          list: [],
          search: '',
          pagination: {
            size: 20,
            total: 10,
            page: 1,
          },
        },
        denied: {
          list: [],
          search: '',
          pagination: {
            size: 20,
            total: 10,
            page: 1,
          },
        },
        unpaid: {
          list: [],
          search: '',
          pagination: {
            size: 20,
            total: 10,
            page: 1,
          },
        },
        unconfirmed: {
          list: [],
          search: '',
          pagination: {
            size: 20,
            total: 10,
            page: 1,
          },
        },
        dialogPost: null,
      },
      catalog: {
        list: [],
        catalog: null,
        filter: [],
      },
      dialogVisible: {
        catalog: false,
        createPost: false,
        viewPost: false,
        updatePost: false,
        denyPost: false,
      },
      idsPicked: {
        public: [],
        expired: [],
        denied: [],
        unpaid: [],
        unconfirmed: [],
      },
      loading: true,
    };
  },

  mounted() {
    this.changePage(2);
    this.getCatalogs();
    this.getPosts();
  },

  computed: {
    filterPublicPage() {
      const startIndex = (this.post.public.pagination.page - 1) * this.post.public.pagination.size;
      const endIndex = this.post.public.pagination.page * this.post.public.pagination.size;
      return this.post.public.list
        .filter(p => {
          return (
            !this.post.public.search ||
            p.title.toLowerCase().includes(this.post.public.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
    filterExpiredPage() {
      const startIndex =
        (this.post.expired.pagination.page - 1) * this.post.expired.pagination.size;
      const endIndex = this.post.expired.pagination.page * this.post.expired.pagination.size;
      return this.post.expired.list
        .filter(p => {
          return (
            !this.post.expired.search ||
            p.title.toLowerCase().includes(this.post.expired.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
    filterDeniedPage() {
      const startIndex = (this.post.denied.pagination.page - 1) * this.post.denied.pagination.size;
      const endIndex = this.post.denied.pagination.page * this.post.denied.pagination.size;
      return this.post.denied.list
        .filter(p => {
          return (
            !this.post.denied.search ||
            p.title.toLowerCase().includes(this.post.denied.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
    filterUnpaidPage() {
      const startIndex = (this.post.unpaid.pagination.page - 1) * this.post.unpaid.pagination.size;
      const endIndex = this.post.unpaid.pagination.page * this.post.unpaid.pagination.size;
      return this.post.unpaid.list
        .filter(p => {
          return (
            !this.post.unpaid.search ||
            p.title.toLowerCase().includes(this.post.unpaid.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
    filterUnconfirmedPage() {
      const startIndex =
        (this.post.unconfirmed.pagination.page - 1) * this.post.unconfirmed.pagination.size;
      const endIndex =
        this.post.unconfirmed.pagination.page * this.post.unconfirmed.pagination.size;
      return this.post.unconfirmed.list
        .filter(p => {
          return (
            !this.post.unconfirmed.search ||
            p.title.toLowerCase().includes(this.post.unconfirmed.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
  },

  methods: {
    isExpired,
    dateTimeFormatter,
    toVnd,
    exportCsv() {
      let csv =
        'id, title, type, status, address_province, address_district, address_ward, address_detail,catalog, created_at, deposit, price, target, user_id\n';
      this.post.all.forEach(post => {
        csv += `${post.id}, ${post.title}, ${post.type}, ${post.status}, ${post.address.province}, ${post.address.district}, ${post.address.ward}, ${post.address.specific_address}, ${post.catalog.name}, ${post.created_at}, ${post.deposit}, ${post.price}, ${post.target}, ${post.user.id}\n`;
      });
      const anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      anchor.target = '_blank';
      anchor.download = 'posts.csv';
      anchor.click();
    },
    async getCatalogs() {
      const res = await CatalogService.getCatalogs();
      if (res.status === 200) {
        this.catalog.list = res.data;
        this.catalog.filter = this.catalog.list.map(catalog => {
          return {
            text: catalog.name,
            value: catalog.id,
          };
        });
      }
    },
    async deleteCatalog(id) {
      const res = await CatalogService.deleteCatalog(id);
      if (res.status === 200) {
        this.$store.state.toast.success('Xóa danh mục thành công!');
        this.getCatalogs();
      } else {
        this.$store.state.toast.error('Xóa danh mục thất bại!');
      }
    },
    async getPosts() {
      this.loading = true;
      const res = await PostService.getPosts();
      if (res.status === 200) {
        this.post.all = res.data;
        this.post.public.list = this.post.all.filter(
          post => post.status === STATUS.PUBLIC && !isExpired(post.expired_at),
        );
        this.post.expired.list = this.post.all.filter(
          post => post.status === STATUS.PUBLIC && isExpired(post.expired_at),
        );
        this.post.denied.list = this.post.all.filter(post => post.status === STATUS.DENIED);
        this.post.unpaid.list = this.post.all.filter(post => post.status === STATUS.UNPAID);
        this.post.unconfirmed.list = this.post.all.filter(
          post => post.status === STATUS.UNCONFIRMED,
        );
        this.post.public.pagination.total = this.post.public.list.length;
        this.post.expired.pagination.total = this.post.expired.list.length;
        this.post.denied.pagination.total = this.post.denied.list.length;
        this.post.unpaid.pagination.total = this.post.unpaid.list.length;
        this.post.unconfirmed.pagination.total = this.post.unconfirmed.list.length;
      }
      this.loading = false;
    },
    async deletePost(id) {
      var obj = { ids: [id] };
      const res = await PostService.deletePost(obj);
      if (res.status === 200) {
        this.getPosts();
        this.$store.state.toast.success('Xóa tin thành công thành công!');
      } else {
        this.$store.state.toast.error('Xóa tin thất bại!');
      }
    },
    async deletePosts(status) {
      var obj = {};
      if (status === STATUS.PUBLIC) {
        obj.ids = this.idsPicked.public.map(post => post.id);
      } else if (status === STATUS.EXPiRED) {
        obj.ids = this.idsPicked.expired.map(post => post.id);
      } else if (status === STATUS.DENIED) {
        obj.ids = this.idsPicked.denied.map(post => post.id);
      } else if (status === STATUS.UNPAID) {
        obj.ids = this.idsPicked.unpaid.map(post => post.id);
      } else if (status === STATUS.UNCONFIRMED) {
        obj.ids = this.idsPicked.unconfirmed.map(post => post.id);
      }
      const res = await PostService.deletePost(obj);
      if (res.status === 200) {
        this.getPosts();
        this.$store.state.toast.success('Xóa bài đăng thành công!');
      } else {
        this.$store.state.toast.error('Xóa bài đăng thất bại!');
      }
    },
    async confirmPost(post) {
      if (!post && !this.idsPicked.unconfirmed.length) {
        this.$store.state.toast.info('Bạn cần chọn tin để duyệt!');
        return;
      }
      var obj = {};
      var arrayNotify = [];
      if (post) {
        console.log(post);
        obj.ids = [post.id];
        arrayNotify = [post];
      } else {
        obj.ids = this.idsPicked.unconfirmed.map(post => post.id);
        arrayNotify = this.idsPicked.unconfirmed;
      }
      const res = await PostService.confirmPost(obj);
      if (res.status === 200) {
        this.getPosts();
        this.$store.state.toast.success('Xác thực bài đăng thành công!');
        arrayNotify.forEach(el => {
          let now = new Date();
          push(ref(database, `notify-user/${el.user.id}`), {
            time: now.toISOString(),
            action: 'confirmed',
            status: false,
            message: `Bài đăng #${el.id} đã được duyệt`,
          });
        });
      } else {
        this.$store.state.toast.error('Xác thực bài đăng thất bại!');
      }
    },
    handleSelectionChangePublic(val) {
      this.idsPicked.public = val;
    },
    handleSelectionChangeExpired(val) {
      this.idsPicked.expired = val;
    },
    handleSelectionChangeDenied(val) {
      this.idsPicked.denied = val;
    },
    handleSelectionChangeUnpaid(val) {
      this.idsPicked.unpaid = val;
    },
    handleSelectionChangeUnconfirmed(val) {
      this.idsPicked.unconfirmed = val;
    },
    filterCatalog(value, row) {
      return row.catalog.id === value;
    },
    triggerCatalogDialog(value) {
      this.dialogVisible.catalog = value;
    },
    triggerCreatePostDialog(value) {
      this.dialogVisible.createPost = value;
    },
    triggerViewPostDialog(value) {
      this.dialogVisible.viewPost = value;
    },
    triggerUpdatePostDialog(value) {
      this.dialogVisible.updatePost = value;
    },
    triggerDenyPostDialog(value) {
      this.dialogVisible.denyPost = value;
    },
    openDenyPostDialog(item) {
      this.post.dialogPost = item;
      this.triggerDenyPostDialog(true);
    },
    openCreateCatalogDialog() {
      this.catalog.catalog = null;
      this.triggerCatalogDialog(true);
    },
    openUpdateCatalogDialog(item) {
      this.catalog.catalog = item;
      this.triggerCatalogDialog(true);
    },
    openViewPostDialog(post) {
      this.post.dialogPost = post;
      this.triggerViewPostDialog(true);
    },
    openUpdatePostDialog(post) {
      this.post.dialogPost = post;
      this.triggerUpdatePostDialog(true);
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
