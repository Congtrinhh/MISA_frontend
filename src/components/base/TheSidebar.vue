<template>
	<aside class="m-sidebar">
		<ul class="m-sidebar-list">
			<li>
				<router-link class="m-sidebar-link" to="/overall"
					><div class="m-sidebar-link-icon icon-dashboard"></div>
					<span class="m-sidebar-link-text">Tổng quan</span></router-link
				>
			</li>
			<li>
				<router-link class="m-sidebar-link" to="/cash"
					><div class="m-sidebar-link-icon icon-cash"></div>
					<span class="m-sidebar-link-text">Tiền mặt</span></router-link
				>
			</li>
			<li>
				<router-link class="m-sidebar-link" to="/employee"
					><div class="m-sidebar-link-icon icon-bank"></div>
					<span class="m-sidebar-link-text">Tiền gửi</span></router-link
				>
			</li>
			<li>
				<router-link class="m-sidebar-link" to="/purchase"
					><div class="m-sidebar-link-icon icon-pu"></div>
					<span class="m-sidebar-link-text">Mua hàng</span></router-link
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-sale"></div>
					<span class="m-sidebar-link-text">Bán hàng</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-invoice"></div>
					<span class="m-sidebar-link-text">Quản lý hoá đơn</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-stock"></div>
					<span class="m-sidebar-link-text">Kho</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-tools"></div>
					<span class="m-sidebar-link-text">Công cụ dụng cụ</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-fixed-assets"></div>
					<span class="m-sidebar-link-text">Tài sản cố định</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-tax"></div>
					<span class="m-sidebar-link-text">Thuế</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-price"></div>
					<span class="m-sidebar-link-text">Giá thành</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-general"></div>
					<span class="m-sidebar-link-text">Tổng hợp</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-budget"></div>
					<span class="m-sidebar-link-text">Ngân sách</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-report"></div>
					<span class="m-sidebar-link-text">Báo cáo</span></a
				>
			</li>
			<li>
				<a class="m-sidebar-link" href="#"
					><div class="m-sidebar-link-icon icon-finance"></div>
					<span class="m-sidebar-link-text">Phân tích tài chính</span></a
				>
			</li>
		</ul>
	</aside>
</template>

<script>
export default {
	components: {},
};
</script>

<style scoped>
@import url(../../css/components/base/the-sidebar.css);
</style>
