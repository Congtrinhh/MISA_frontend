<template>
	<div class="main-nav">
		<div class="nav-wrapper">
			<div class="left flex flex-1">
				<div class="multi-media mi-36"></div>
				<div class="logo-wrapper flex-center-middle">
					<div class="logo mi-32"></div>
					<div class="text">Quy trình</div>
				</div>

				<div class="nav-options flex-middle">
					<div class="menu-item">
						<div class="menu-item-name">Lượt chạy</div>
						<div class=""></div>
					</div>
					<div class="menu-item">
						<div class="menu-item-name">Thiết kế quy trình</div>
						<div class=""></div>
					</div>
					<div class="menu-item">
						<div class="menu-item-name">Báo cáo</div>
						<div class=""></div>
					</div>
					<div class="menu-item active">
						<div class="menu-item-name">Thiết lập</div>
						<div class="menu-item-active"></div>
					</div>
					<div class="btn-run-process">
						<button
							tabindex="1"
							type="button"
							name="button"
							class="ms-button ms-button-primary ms-button-filled ms-button-icon-run-process includeIcon"
						>
							<div
								class="ms-icon-default flex items-center justify-center ms-button--icon ms-icon-white"
								style="order: 0; margin-right: 4px; margin-left: 0px"
							>
								<i class="ms-icon notranslate icon-scale icon-run-process mi-20"></i>
							</div>
							<span class="ms-button-text ms-button--text">Chạy quy trình </span>
						</button>
					</div>
				</div>
			</div>

			<div class="right flex-middle">
				<div class="flex-middle global-search">
					<div id="searchInput" class="ab-c-m"></div>
					<div class="pre-icon mi-search mi-24"></div>
					<input placeholder="Nhập ID, tiêu đề lượt chạy" type="text" class="flex-1 m-l-4" /><!---->
				</div>
				<div class="notification-wrapper">
					<div class="notification-unread-count">11</div>
					<div class="notification-box"></div>
				</div>
				<div class="user">
					<div class="user-avatar">
						<div class="avatar-parent">
							<img
								src="https://testcdnamisapp.misacdn.net/APIS/PlatformAPI/api/Avatar/5a426d1d-f731-4d88-962f-52b7756868ba/594LXLY7.jpg?avatarID=a1015034-89ce-45db-b1e4-cca57d9eb281&amp;width=64&amp;height=64&amp;v=20211108"
							/>
						</div>
					</div>
					<div class="user-account-menu"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang="scss">
@import "@/assets/css/components/base/the-header.scss";
</style>
