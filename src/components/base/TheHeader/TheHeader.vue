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
					<div class="menu-item" :class="{ active: tab.active }" v-for="(tab, index) in tabs" :key="index">
						<div class="menu-item-name">{{ tab.name }}</div>
						<div :class="{ 'menu-item-active': tab.active }"></div>
					</div>
					<div class="btn-run-process">
						<MButton
							btnClasses="ms-button ms-button-primary ms-button-filled ms-button-icon-run-process includeIcon"
							iconClasses="ms-icon notranslate icon-scale icon-run-process mi-20"
							>Chạy quy trình</MButton
						>
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
import MButton from "@/components/base/MButton/MButton.vue";

export default defineComponent({
	components: { MButton },
	data() {
		return {
			// mảng các tabs của header
			tabs: [
				{
					name: "Lượt chạy",
					link: "",
				},
				{
					name: "Thiết kế quy trình",
					link: "",
				},
				{
					name: "Báo cáo",
					link: "",
				},
				{
					name: "Thiết lập",
					link: "",
					active: true,
				},
			],
		};
	},
});
</script>

<style scoped lang="scss">
@import "./the-header.scss";
</style>
