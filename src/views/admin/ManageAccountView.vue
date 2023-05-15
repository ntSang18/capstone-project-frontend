<template>
  <main id="account-management" class="main-container">
    <div class="head-title">
      <div class="left">
        <h1 class="title">Quản lý tin đăng</h1>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/admin' }">Admin</el-breadcrumb-item>
          <el-breadcrumb-item>Quản lý tin đăng</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <button class="btn-download">
        <i class="bx bxs-cloud-download"></i>
        <span class="text">Download CSV</span>
      </button>
    </div>

    <div class="tab-container">
      <el-tabs>
        <el-tab-pane label="Tài khoản người dùng">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tài khoản người dùng</h3>
              <div class="operations">
                <el-button type="info">Khóa tất cả</el-button>
                <el-button type="danger">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
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
              <el-table-column label="Tên người dùng" prop="username" sortable width="180" />
              <el-table-column label="Số điện thoại" prop="phone_number" sortable width="180" />
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
                    <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)"
                      >Khóa</el-button
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
        <el-tab-pane label="Tài khoản quản lý">
          <div class="table-container">
            <div class="table-head">
              <h3 class="table-title">Tài khoản quản lý</h3>
              <div class="operations">
                <el-button type="info">Khóa tất cả</el-button>
                <el-button type="danger">Xóa tất cả</el-button>
              </div>
            </div>
            <el-table
              :data="tableData"
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
                    <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)"
                      >Khóa</el-button
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
      </el-tabs>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          email: 'a@gmail.com',
          username: 'Nguyen Van A',
          phone_number: '0777908037',
          created_at: '06-18-2001',
        },
        {
          id: 2,
          email: 'b@gmail.com',
          username: 'Nguyen Van B',
          phone_number: '0777908037',
          created_at: '06-18-2001',
        },
        {
          id: 3,
          email: 'C@gmail.com',
          username: 'Nguyen Van C',
          phone_number: '0777908037',
          created_at: '06-18-2001',
        },
      ],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style src="@/assets/styles/admin/manage.css"></style>
