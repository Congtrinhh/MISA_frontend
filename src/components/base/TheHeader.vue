<template>
	<header class="m-header">
		<div class="m-header-left">
			<div class="m-header-left-hybrid">
				<a href="#" class="m-header-left-hybrid-icon"></a>
				<a href="#" class="m-header-left-hybrid-brand">
					<img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="" />
				</a>
			</div>

			<div class="m-header-left-toggle">
				<button id="sidebarToggle" @click="onToggleSidebarClick"></button>
			</div>
			<div class="m-header-left-select">
				<div class="m-header-left-select-text">Công ty cổ phần Vô Cùng Kỳ Diệu</div>
				<div class="m-header-left-select-icon"></div>
			</div>
			<div class="m-header-left-badge"></div>
		</div>

		<div class="m-header-right">
			<div class="m-header-right-download"></div>
			<div class="m-header-right-search-wrapper"></div>
			<div class="m-header-right-more"></div>
			<div class="m-header-right-setting"></div>
			<div class="m-header-right-chat"></div>
			<div class="m-header-right-question"></div>
			<div class="m-header-right-info"></div>
			<div class="m-header-right-notification mi-24"></div>
			<button class="m-header-right-account-wrapper">
				<div class="m-header-right-account-avatar"></div>
				<div class="m-header-right-account-name">Trịnh Quý Công</div>
				<div class="m-header-right-account-icon"></div>
			</button>
		</div>
	</header>
</template>

<script>
import $ from "jquery";

export default {
	components: {},

	methods: {
		onToggleSidebarClick() {
			$("body").toggleClass("sidebar-collapse");
		},
	},
};
</script>

<style scoped>
@import url(../../css/components/base/the-header.css);
</style>
