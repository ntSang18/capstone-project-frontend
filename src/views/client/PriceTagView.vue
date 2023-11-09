<template>
  <div id="price">
    <section id="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">Trang chủ</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">Bảng giá dịch vụ</el-breadcrumb-item>
      </el-breadcrumb>
    </section>

    <section id="price-tag">
      <h1 class="title">Bảng giá dịch vụ</h1>
      <span class="date-apply">Áp dụng từ ngày 18/06/2023</span>
      <table class="table-price">
        <thead>
          <tr>
            <th class="header-empty"></th>
            <th class="package-vip1">
              <span>Tin VIP 1</span>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </th>
            <th class="package-vip2">
              <span>Tin VIP 2</span>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </th>
            <th class="package-vip3">
              <span>Tin VIP 3</span>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </th>
            <th class="package-vip4">
              <span>Tin VIP 4</span>
              <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </th>
            <th class="package-normal">
              <span>Tin thường</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="nowrap top">
              <strong>Ưu điểm</strong>
            </td>
            <td>
              <p>- Lượt xem nhiều gấp <strong>30 lần</strong> tin thường</p>
              <p>- Ưu việt, tiếp cận <strong>tối đa</strong> khách hàng</p>
              <p>- Xuất hiện vị trí <strong>đầu tiên ở trang chủ</strong></p>
              <p>- Đứng trên <strong>tất cả</strong> các loại tin VIP khác</p>
              <p>
                - Xuất hiện <strong>đầu tiên</strong> ở mục tin nổi bật xuyên suốt khu vực chuyên
                mục đó
              </p>
            </td>
            <td>
              <p>- Lượt xem nhiều gấp <strong>15 lần</strong> so với tin thường</p>
              <p>- Tiếp cận <strong>rất nhiều</strong> khách hàng</p>
              <p>
                - Xuất hiện sau <strong> VIP 1</strong> và
                <strong>trước VIP 3, VIP 4, tin thường</strong>
              </p>
              <p>- Xuất hiện thêm ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó</p>
            </td>
            <td>
              <p>- Lượt xem nhiều gấp <strong>10 lần</strong> so với tin thường</p>
              <p>- Tiếp cận khách hàng <strong>rất tốt</strong></p>
              <p>
                - Xuất hiện sau <strong> VIP 2</strong> và
                <strong>trước VIP 4, tin thường</strong>
              </p>
              <p>- Xuất hiện thêm ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó</p>
            </td>
            <td>
              <p>- Lượt xem nhiều gấp <strong>5 lần</strong> so với tin thường</p>
              <p>- Tiếp cận khách hàng <strong>tốt</strong></p>
              <p>
                - Xuất hiện sau <strong> VIP 3</strong> và
                <strong>trước tin thường</strong>
              </p>
            </td>
            <td>
              <p>- Tiếp cận khách hàng <strong>khá tốt</strong></p>
              <p>- Xuất hiện sau <strong> các loại tin VIP</strong></p>
            </td>
          </tr>
          <tr>
            <td class="nowrap top"><strong>Phù hợp</strong></td>
            <td>
              <p>
                - Phù hợp khách hàng là công ty/cá nhân sở hữu hệ thống lớn có từ 15-20 căn
                phòng/nhà trở lên hoặc phòng trống quá lâu, thường xuyên đang cần
                <strong>cho thuê gấp</strong>.
              </p>
            </td>
            <td>
              <p>
                - Phù hợp khách hàng cá nhân/môi giới có 10-15 căn phòng/nhà đang trống thường
                xuyên, cần <strong>cho thuê nhanh nhất</strong>.
              </p>
            </td>
            <td>
              <p>
                - Phù hợp khách hàng cá nhân/môi giới có lượng căn trống thường xuyên, cần
                <strong>cho thuê nhanh hơn</strong>.
              </p>
            </td>
            <td>
              <p>
                - Phù hợp loại hình phòng trọ chung chủ, KTX ở ghép hay khách hàng có 1-5 căn
                phòng/nhà cần cho thuê nhanh, <strong>tiếp cận khách hàng tốt hơn</strong>.
              </p>
            </td>
            <td>
              <p>
                - Phù hợp tất cả các loại hình tuy nhiên lượng tiếp cận
                <strong>khách hàng thấp hơn</strong> và <strong>cho thuê chậm hơn so</strong> với
                tin VIP.
              </p>
            </td>
          </tr>
          <tr>
            <td class="nowrap"><strong>Giá ngày</strong></td>
            <td>
              <span class="price-day">80.000đ</span><span class="min-day">(Tối thiểu 5 ngày)</span>
            </td>
            <td>
              <span class="price-day">40.000đ</span><span class="min-day">(Tối thiểu 5 ngày)</span>
            </td>
            <td>
              <span class="price-day">20.000đ</span><span class="min-day">(Tối thiểu 5 ngày)</span>
            </td>
            <td>
              <span class="price-day">10.000đ</span><span class="min-day">(Tối thiểu 5 ngày)</span>
            </td>
            <td>
              <span class="price-day">2.000đ</span><span class="min-day">(Tối thiểu 5 ngày)</span>
            </td>
          </tr>
          <tr>
            <td class="nowrap"><strong>Giá tuần (7 ngày)</strong></td>
            <td><span class="price-week">560.000đ</span></td>
            <td><span class="price-week">280.000đ</span></td>
            <td><span class="price-week">140.000đ</span></td>
            <td><span class="price-week">70.000đ</span></td>
            <td><span class="price-week">14.000đ</span></td>
          </tr>
          <tr>
            <td class="nowrap">
              <strong>Giá tháng (30 ngày)</strong>
              <p class="subtitle">Rẻ hơn 10% so với giá ngày</p>
            </td>
            <td>
              <span class="before-price-month">2.400.000đ</span
              ><span class="discount">Giảm 25% chỉ còn</span
              ><span class="price-month">1.800.000đ</span>
            </td>
            <td>
              <span class="before-price-month">1.200.000đ</span
              ><span class="discount">Giảm 25% chỉ còn</span
              ><span class="price-month">900.000đ</span>
            </td>
            <td>
              <span class="before-price-month">600.000đ</span
              ><span class="discount">Giảm 25% chỉ còn</span
              ><span class="price-month">450.000đ</span>
            </td>
            <td>
              <span class="before-price-month">300.000đ</span
              ><span class="discount">Giảm 25% chỉ còn</span
              ><span class="price-month">225.000đ</span>
            </td>
            <td>
              <span class="before-price-month">60.000đ</span
              ><span class="discount">Giảm 25% chỉ còn</span
              ><span class="price-month">45.000đ</span>
            </td>
          </tr>
          <tr>
            <td class="nowrap"><strong>Giá đẩy tin</strong></td>
            <td>40.000 đ</td>
            <td>25.000 đ</td>
            <td>15.000 đ</td>
            <td>10.000 đ</td>
            <td>2.000 đ</td>
          </tr>
          <tr>
            <td class="nowrap"><strong>Màu sắc tiêu đề</strong></td>
            <td>
              <p><span class="title-color vip1">TIÊU ĐỀ MÀU ĐỎ, IN HOA</span></p>
            </td>
            <td>
              <p><span class="title-color vip2">TIÊU ĐỀ MÀU HỒNG, IN HOA</span></p>
            </td>
            <td>
              <p><span class="title-color vip3">TIÊU ĐỀ MÀU CAM, IN HOA</span></p>
            </td>
            <td>
              <p><span class="title-color vip4">TIÊU ĐỀ MÀU XANH, IN HOA</span></p>
            </td>
            <td>
              <p>
                <span class="title-color normal">Tiêu đề màu mặc định, viết thường</span>
              </p>
            </td>
          </tr>
          <!-- <tr>
            <td class="nowrap"><strong>Tự động duyệt</strong></td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/tick.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/tick.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/tick.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/tick.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/x.png" /></p>
            </td>
          </tr> -->
          <tr>
            <td class="nowrap">
              <strong
                >Hiển thị số điện thoại<br />
                ở trang danh sách</strong
              >
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/tick.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/x.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/x.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/x.png" /></p>
            </td>
            <td>
              <p class="img-container"><img src="@/assets/images/icon/x.png" /></p>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section id="illustration">
      <h1 class="title">Minh họa hình đăng</h1>
      <div class="vip-demo-container">
        <div class="vip-demo vip1">
          <h3 class="demo-title">
            Tin VIP 1
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </h3>
          <p class="description">
            <strong>TIÊU ĐỀ IN HOA MÀU ĐỎ</strong>, gắn biểu tượng 5 ngôi sao màu vàng và hiển thị
            to và nhiều hình hơn các tin khác. Nằm trên tất cả các tin khác, được hưởng nhiều ưu
            tiên và hiệu quả giao dịch cao nhất.
          </p>
          <p class="place-display">
            Đồng thời xuất hiện đầu tiên ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó
          </p>
          <img src="@/assets/images/default/demo-vip1.jpg" />
          <img src="@/assets/images/default/demo-vip1-1.jpg" />
        </div>
        <div class="vip-demo vip2">
          <h3 class="demo-title">
            Tin VIP 2
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </h3>
          <p class="description">
            <strong>TIÊU ĐỀ IN HOA MÀU HỒNG</strong>, gắn biểu tượng 4 ngôi sao màu vàng ở tiêu đề
            tin đăng. Hiển thị sau tin VIP 1, tin VIP 2 và trên các tin khác.
          </p>
          <img src="@/assets/images/default/demo-vip2.jpg" />
        </div>
        <div class="vip-demo vip3">
          <h3 class="demo-title">
            Tin VIP 3
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </h3>
          <p class="description">
            <strong>TIÊU ĐỀ IN HOA MÀU CAM</strong>, gắn biểu tượng 3 ngôi sao màu vàng ở tiêu đề
            tin đăng. Hiển thị sau tin VIP 1, tin VIP 2, tin VIP 3 và trên các tin khác.
          </p>
          <img src="@/assets/images/default/demo-vip3.jpg" />
        </div>
        <div class="vip-demo vip3">
          <h3 class="demo-title">
            Tin VIP 4
            <div class="stars">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
          </h3>
          <p class="description">
            <strong>TIÊU ĐỀ IN HOA MÀU XANH</strong>, gắn biểu tượng 2 ngôi sao màu vàng ở tiêu đề
            tin đăng. Hiển thị sau tin VIP 1, tin VIP 2, tin VIP 3, tin VIP 4 và trên các tin khác.
          </p>
          <img src="@/assets/images/default/demo-vip4.jpg" />
        </div>
        <div class="vip-demo normal">
          <h3 class="demo-title">Tin thường</h3>
          <p class="description">
            <strong>Tiêu đề màu mặc định, viết thường</strong>. Hiển thị sau các tin VIP.
          </p>
          <img src="@/assets/images/default/demo-normal.jpg" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="@/assets/styles/client/price.css"></style>
