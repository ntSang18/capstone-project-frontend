<template>
  <main id="account-management" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Quản lý người dùng</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Quản lý người dùng</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="btn-group">
        <button class="btn-create" @click="triggerCreateDialog(true)">
          <i class="bx bxs-plus-circle"></i>
          <span class="text">Tạo tài khoản</span>
        </button>
        <button class="btn-download" @click="exportCsv()">
          <i class="bx bxs-cloud-download"></i>
          <span class="text">Download CSV</span>
        </button>
      </div>
    </div>

    <div class="tab-container">
      <el-tabs>
        <el-tab-pane label="Tài khoản người dùng">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tài khoản người dùng</h3>
              <div class="operations">
                <el-button type="danger" @click="deleteUser()">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="filterUserPage"
              :default-sort="{ prop: 'id' }"
              stripe
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column fixed="left" prop="id" label="Id" width="70" sortable />
              <el-table-column label="Email" prop="email" width="300" />
              <el-table-column label="Tên người dùng" prop="username" width="180" />
              <el-table-column label="Số điện thoại" prop="phone_number" width="180" />
              <el-table-column label="Ngày tạo" prop="created_at" sortable width="180">
                <template #default="scope">
                  <span>{{ dateFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="user.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-button size="small" @click="viewUser(scope.row)">
                      <i class="bx bx-search-alt"></i>
                    </el-button>
                    <el-button
                      v-if="scope.row.locked"
                      size="small"
                      type="primary"
                      @click="unlockUser(scope.row.id)"
                    >
                      <i class="bx bx-lock-open-alt"></i>
                    </el-button>
                    <el-button v-else size="small" type="info" @click="lockUser(scope.row.id)">
                      <i class="bx bx-lock-alt"></i>
                    </el-button>
                    <el-popconfirm
                      width="200"
                      confirm-button-type="danger"
                      confirm-button-text="Xác nhận"
                      cancel-button-text="Hủy"
                      title="Xác nhận xóa tài khoản này?"
                      @confirm="deleteUser(scope.row.id)"
                    >
                      <template #reference>
                        <el-button size="small" type="danger"
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
                :page-size="user.pagination.size"
                v-model:current-page="user.pagination.page"
                :total="user.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tài khoản quản lý">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tài khoản quản lý</h3>
              <div class="operations"></div>
            </div>
            <el-table
              :data="filterAdminPage"
              stripe
              style="width: 100%"
              max-height="1000"
              height="400"
              cell-class-name="table-cell"
              header-cell-class-name="table-cell"
            >
              <el-table-column fixed="left" prop="id" label="Id" width="70" sortable />
              <el-table-column label="Email" prop="email" width="300" />
              <el-table-column label="Tên người dùng" prop="username" sortable width="180" />
              <el-table-column label="Số điện thoại" prop="phone_number" sortable width="180" />
              <el-table-column label="Ngày tạo" prop="created_at" sortable width="180">
                <template #default="scope">
                  <span>{{ dateFormatter(scope.row.created_at) }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="200">
                <template #header>
                  <el-input
                    v-model="admin.search"
                    size="small"
                    placeholder="Type to search"
                    clearable
                  />
                </template>
                <template #default="scope">
                  <div class="action-container">
                    <el-button size="small" @click="viewUser(scope.row)">
                      <i class="bx bx-search-alt"></i>
                    </el-button>
                    <el-button
                      v-if="scope.row.locked"
                      size="small"
                      type="primary"
                      @click="unlockUser(scope.row.id)"
                    >
                      <i class="bx bx-lock-open-alt"></i>
                    </el-button>
                    <el-button v-else size="small" type="info" @click="lockUser(scope.row.id)">
                      <i class="bx bx-lock-alt"></i>
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteUser(scope.row.id)">
                      <i class="bx bx-trash-alt"></i>
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                small
                background
                layout="prev, pager, next"
                :page-size="admin.pagination.size"
                v-model:current-page="admin.pagination.page"
                :total="admin.pagination.total"
              />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <create-user-dialog
      :dialogVisible="dialogCreateVisible"
      @triggerDialog="triggerCreateDialog"
      :getUsers="getUsers"
    />

    <view-user-dialog
      :dialogVisible="dialogViewVisible"
      :user="userDialog"
      @triggerDialog="triggerViewDialog"
    />
  </main>
</template>

<script>
import UserService from '@/services/UserService';
import CreateUserDialog from '@/components/admin/user/CreateUserDialog';
import ViewUserDialog from '@/components/admin/user/ViewUserDialog';
import { dateFormatter } from '@/utils/dateFormatter';
export default {
  props: {
    changePage: Function,
  },
  data() {
    return {
      users: [],
      user: {
        list: [],
        search: '',
        pagination: {
          size: 20,
          total: 0,
          page: 1,
        },
      },
      admin: {
        list: [],
        search: '',
        pagination: {
          size: 20,
          total: 0,
          page: 1,
        },
      },
      multipleSelection: [],
      dialogCreateVisible: false,
      dialogViewVisible: false,
      userDialog: null,
    };
  },
  components: {
    CreateUserDialog,
    ViewUserDialog,
  },
  mounted() {
    this.changePage(3);
    this.getUsers();
  },
  computed: {
    filterUserPage() {
      const startIndex = (this.user.pagination.page - 1) * this.user.pagination.size;
      const endIndex = this.user.pagination.page * this.user.pagination.size;
      return this.user.list
        .filter(u => {
          return (
            !this.user.search ||
            u.email.toLowerCase().includes(this.user.search.toLowerCase()) ||
            u.username.toLowerCase().includes(this.user.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
    filterAdminPage() {
      const startIndex = (this.admin.pagination.page - 1) * this.admin.pagination.size;
      const endIndex = this.admin.pagination.page * this.admin.pagination.size;
      return this.admin.list
        .filter(a => {
          return (
            !this.admin.search ||
            a.email.toLowerCase().includes(this.admin.search.toLowerCase()) ||
            a.username.toLowerCase().includes(this.admin.search.toLowerCase())
          );
        })
        .slice(startIndex, endIndex);
    },
  },
  methods: {
    dateFormatter,
    exportCsv() {
      let csv =
        'id, email, username, phone_number, facebook, image_url, balance, role, created_at, updated_at, locked, province, district, ward, specific_address\n';
      this.users.forEach(user => {
        csv += `${user.id}, ${user.email}, ${user.username}, ${user.phone_number}, ${user.facebook}, ${user.image_url}, ${user.balance}, ${user.role}, ${user.created_at}, ${user.updated_at}, ${user.locked}, ${user.province}, ${user.district}, ${user.ward}, ${user.specific_address}\n`;
      });
      const anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      anchor.target = '_blank';
      anchor.download = 'users.csv';
      anchor.click();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async getUsers() {
      const res = await UserService.getUsers();
      if (res.status === 200) {
        this.users = res.data.users;
        this.user.pagination.total = res.data.total_user;
        this.admin.pagination.total = res.data.total_admin;
        this.user.list = res.data.users.filter(u => u.role === 'ROLE_USER');
        this.admin.list = res.data.users.filter(u => u.role === 'ROLE_ADMIN');
      }
    },
    async lockUser(id) {
      const obj = {
        ids: [id],
      };
      const res = await UserService.lockUser(obj);
      if (res.status === 200) {
        this.getUsers();
        this.$store.state.toast.success('Khóa người dùng thành công!');
      } else {
        console.log(res);
        this.$store.state.toast.error('Khóa người dùng thất bại!');
      }
    },
    async unlockUser(id) {
      const obj = {
        ids: [id],
      };
      const res = await UserService.unlockUser(obj);
      if (res.status === 200) {
        this.getUsers();
        this.$store.state.toast.success('Mở khóa người dùng thành công!');
      } else {
        this.$store.state.toast.error('Mở khóa người dùng thất bại!');
      }
    },
    async deleteUser(id) {
      if (!id && !this.multipleSelection.length) {
        this.$store.state.toast.info('Bạn cần chọn người dùng để xóa!');
        return;
      }
      var obj = id ? { ids: [id] } : { ids: this.multipleSelection.map(user => user.id) };
      const res = await UserService.deleteUser(obj);
      if (res.status === 200) {
        this.getUsers();
        this.$store.state.toast.success('Xóa người dùng thành công!');
      } else {
        this.$store.state.toast.error('Xóa người dùng thất bại!');
      }
    },
    triggerCreateDialog(value) {
      this.dialogCreateVisible = value;
    },
    triggerViewDialog(value) {
      this.dialogViewVisible = value;
    },
    viewUser(user) {
      this.userDialog = user;
      this.triggerViewDialog(true);
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
