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
/* @import url(../../css/components/base/the-sidebar.css); */
/* --------------------------------- SIDEBAR --------------------------------- */
.m-sidebar {
	color: #fff;
}

.m-sidebar .m-sidebar-list {
	display: flex;
	flex-direction: column;
	padding-top: 14px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link {
	color: #fff;
	border-left: 6px solid transparent;
	padding: 0 14px 0 8px;
	height: 42px;
	display: flex;
	align-items: center;
}

.m-sidebar .m-sidebar-list .m-sidebar-link:active {
	border-left-color: var(--primary-color);
	background-color: #58595d;
}

.m-sidebar .m-sidebar-list .m-sidebar-link.active {
	border-left-color: var(--primary-color);
	background-color: #58595d;
}

.m-sidebar .m-sidebar-list .m-sidebar-link.active .m-sidebar-link-icon {
}

.m-sidebar .m-sidebar-list .m-sidebar-link.active .m-sidebar-link-text {
	font-weight: bold;
}

.m-sidebar .m-sidebar-list .m-sidebar-link:hover {
	background-color: #58595d;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-text {
	display: inline-block;
	margin-left: 6px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon {
	display: inline-block;

	width: 24px;
	height: 24px;
	min-width: 24px;
	min-height: 24px;

	background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat;
	cursor: pointer;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-dashboard {
	background-position: -30px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-cash {
	background-position: -73px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-bank {
	background-position: -117px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-pu {
	background-position: -161px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-sale {
	background-position: -204px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-invoice {
	background-position: -249px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-stock {
	background-position: -291px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-tools {
	background-position: -336px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-fixed-assets {
	background-position: -378px -1630px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-tax {
	background-position: -423px -1630px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-price {
	background-position: -467px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-general {
	background-position: -510px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-budget {
	background-position: -378px -1659px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-report {
	background-position: -547px -1628px;
}

.m-sidebar .m-sidebar-list .m-sidebar-link-icon.icon-finance {
	background-position: -204px -1664px;
}
</style>
