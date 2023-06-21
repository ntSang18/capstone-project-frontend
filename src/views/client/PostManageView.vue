<template>
  <div id="post-manage" class="main-container">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Quản lý tin</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="content" class="section">
      <h1 class="title">Quản lý tin đăng ({{ post.list.length }} tin)</h1>
      <div class="table-content">
        <el-table
          :data="postPage"
          stripe
          :default-sort="{ prop: 'id' }"
          height="500"
          style="width: 100%"
          :border="true"
        >
          <el-table-column label="Mã tin" prop="id" width="90" sortable fixed="left" />
          <el-table-column label="Ảnh đại diện" prop="avatar" width="140">
            <template #default="scope">
              <img v-if="scope.row.medias.length" :src="scope.row.medias[0].url" class="avatar" />
            </template>
          </el-table-column>
          <el-table-column label="Tiêu đề" prop="title" width="300">
            <template #default="scope">
              <div class="title-container">
                <p @click="viewDetailsPost(scope.row.id)">{{ scope.row.title }}</p>
                <div class="btn-group">
                  <el-tooltip
                    v-if="scope.row.status !== 'UNCONFIRMED' && scope.row.status !== 'DENIED'"
                    :content="scope.row.status === 'UNPAID' ? 'Thanh toán tin' : 'Gia hạn tin'"
                    placement="top"
                    effect="light"
                  >
                    <el-button
                      type="primary"
                      size="small"
                      circle
                      @click="openPostPaymentDialog(scope.row)"
                    >
                      <i class="bx bx-purchase-tag"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip content="Chỉnh sửa tin" placement="top" effect="light">
                    <el-button
                      type="warning"
                      size="small"
                      circle
                      @click="openUpdatePostDialog(scope.row)"
                    >
                      <i class="bx bx-edit-alt"></i>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                    v-if="scope.row.status === 'DENIED'"
                    content="Lý do bị từ chối"
                    placement="top"
                    effect="light"
                  >
                    <el-button size="small" circle @click="openRefuseReasonDialog(scope.row)">
                      <i class="bx bx-show"></i>
                    </el-button>
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
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Giá" prop="price" sortable width="120">
            <template #default="scope">
              <span>{{ toVndString(scope.row.price) }}/tháng</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Trạng thái"
            prop="status"
            width="150"
            :filters="labelStatus"
            :filter-method="filterTag"
            filter-placement="bottom"
          >
            <template #default="scope">
              <el-tag effect="dark" round :type="statusType(scope.row)">
                {{ statusString(scope.row) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Ngày bắt đầu" prop="start" sortable width="180">
            <template #default="scope">
              <span v-if="scope.row.paid_at">{{ dateTimeFormatter(scope.row.paid_at) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Ngày kết thúc" prop="end" sortable width="180">
            <template #default="scope">
              <span v-if="scope.row.expired_at">{{ dateTimeFormatter(scope.row.expired_at) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>

  <post-payment-dialog
    :post="post.dialogPost"
    :dialogVisible="dialogVisible.postPayment"
    @triggerDialog="triggerPostPaymentDialog"
    :getPosts="getPosts"
  />

  <refuse-reason-dialog
    :post="post.dialogPost"
    :dialogVisible="dialogVisible.refuseReason"
    @triggerDialog="triggerRefuseReasonDialog"
  />

  <update-post-dialog
    :dialogVisible="dialogVisible.updatePost"
    :post="post.dialogPost"
    @triggerDialog="triggerUpdatePostDialog"
    :getPosts="getPosts"
  />
</template>

<script>
import { toVndString } from '@/utils/numberFormatter';
import PostService from '@/services/PostService';
import { dateTimeFormatter } from '@/utils/dateFormatter';
import { isExpired } from '@/utils/isExpired';
import { STATUS, LABEL_STATUS } from '@/common/postStatuses';
import PostPaymentDialog from '@/components/client/manage/PostPaymentDialog';
import RefuseReasonDialog from '@/components/client/manage/RefuseReasonDialog';
import UpdatePostDialog from '@/components/client/manage/UpdatePostDialog';
export default {
  components: {
    PostPaymentDialog,
    RefuseReasonDialog,
    UpdatePostDialog,
  },
  data() {
    return {
      post: {
        list: [],
        dialogPost: null,
      },
      pagination: {
        size: 20,
        total: 10,
        page: 1,
      },
      dialogVisible: {
        postPayment: false,
        refuseReason: false,
        updatePost: false,
      },
      labelStatus: [],
    };
  },
  mounted() {
    this.getPosts();
    this.labelStatus = LABEL_STATUS;
  },
  computed: {
    postPage() {
      const startIndex = (this.pagination.page - 1) * this.pagination.size;
      const endIndex = this.pagination.page * this.pagination.size;
      return this.post.list.slice(startIndex, endIndex);
    },
  },
  methods: {
    toVndString,
    isExpired,
    viewDetailsPost(id) {
      this.$router.push(`/post/${id}`);
    },
    dateTimeFormatter,
    async getPosts() {
      const res = await PostService.getPersonalPosts();
      if (res.status === 200) {
        this.post.list = res.data;
        this.pagination.total = this.post.list.length;
      }
    },
    async deletePost(id) {
      const obj = {
        ids: [id],
      };
      const res = await PostService.deletePost(obj);
      if (res.status === 200) {
        this.getPosts();
        this.$store.state.toast.success('Xóa tin thành công!');
      } else {
        this.$store.state.toast.error('Xóa tin thất bại!');
      }
    },
    statusString(post) {
      var status = '';
      if (post.status === STATUS.PUBLIC && this.isExpired(post.expired_at)) {
        status = STATUS.EXPIRED;
      } else {
        status = post.status;
      }
      var label = this.labelStatus.find(ls => ls.value === status);
      return label.text;
    },
    statusType(post) {
      if (post.status === STATUS.PUBLIC) {
        if (this.isExpired(post.expired_at)) {
          return 'info';
        } else {
          return 'primary';
        }
      } else if (post.status === STATUS.UNPAID) {
        return 'success';
      } else if (post.status === STATUS.DENIED) {
        return 'danger';
      } else {
        return 'warning';
      }
    },
    filterTag(value, row) {
      if (value === STATUS.EXPIRED) {
        if (row.status === STATUS.PUBLIC && isExpired(row.expired_at)) {
          return true;
        } else return false;
      }
      return row.status === value;
    },
    triggerPostPaymentDialog(value) {
      this.dialogVisible.postPayment = value;
    },
    openPostPaymentDialog(post) {
      this.post.dialogPost = post;
      this.triggerPostPaymentDialog(true);
    },
    triggerRefuseReasonDialog(value) {
      this.dialogVisible.refuseReason = value;
    },
    openRefuseReasonDialog(post) {
      this.post.dialogPost = post;
      this.triggerRefuseReasonDialog(true);
    },
    triggerUpdatePostDialog(value) {
      this.dialogVisible.updatePost = value;
    },
    openUpdatePostDialog(post) {
      this.post.dialogPost = post;
      this.triggerUpdatePostDialog(true);
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/manage.css"></style>
