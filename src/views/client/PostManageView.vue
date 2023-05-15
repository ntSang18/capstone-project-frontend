<template>
  <div id="post-manage" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Quản lý tin</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Quản lý tin đăng</h1>
      <div class="table-content">
        <el-table :data="filterTableData" style="width: 100%" :border="true" max-height="500">
          <el-table-column label="Mã tin" prop="id" width="80" sortable fixed="left" />
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
          <el-table-column label="Ngày bắt đầu" prop="start" sortable width="180" />
          <el-table-column label="Ngày kết thúc" prop="end" sortable width="180" />
          <el-table-column
            label="Trạng thái"
            prop="status"
            width="150"
            :filters="[
              { text: 'Đang hiển thị', value: 'publish' },
              { text: 'Hết hạn', value: 'expired' },
              { text: 'Đang ẩn', value: 'hidden' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom"
          >
            <template #default="scope">
              <el-tag>{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="200">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <div class="action-container">
                <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)"
                  >Xem</el-button
                >
                <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)"
                  >Sửa</el-button
                >
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  >Xóa</el-button
                >
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                  >Xóa</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<script>
import numberToVND from '@/utils/numberToVND';
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          title: 'cho thuê Ký Túc Xá giá 1.5tr bao điện nước',
          price: 1500000,
          start: '2023-05-02',
          end: '2023-05-07',
          status: 'publish',
        },
        {
          id: 2,
          avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          title: 'cho thuê Ký Túc Xá giá 1.5tr bao điện nước',
          price: 1500000,
          start: '2023-05-02',
          end: '2023-05-07',
          status: 'expired',
        },
        {
          id: 3,
          avatar: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          title: 'cho thuê Ký Túc Xá giá 1.5tr bao điện nước',
          price: 1500000,
          start: '2023-05-02',
          end: '2023-05-07',
          status: 'hidden',
        },
      ],
    };
  },
  computed: {
    filterTableData() {
      return this.tableData;
    },
  },
  methods: {
    numberToVND,
  },
};
</script>

<style scoped src="@/assets/styles/client/manage.css"></style>
