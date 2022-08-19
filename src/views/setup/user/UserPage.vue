<template>
	<!-- Toast thông báo chung  -->
	<DxToast
		:displayTime="3000"
		v-model:message="toastConfig.message"
		v-model:type="toastConfig.type"
		v-model:visible="toastConfig.visible"
		:min-width="260"
		width="auto"
		:height="45"
		type="custom"
		:position="{ my: 'top', at: 'top', offset: '0 50' }"
	/>
	<!-- end of Toast thông báo chung  -->

	<!-- bảng user và các tuỳ chọn lọc -->
	<UserList @btnAddNewUserClick="handleShowUserCreateNewDialog" />
	<!-- end of bảng user và các tuỳ chọn lọc -->

	<!-- form update user -->
	<UserUpdate v-if="showUserUpdateDialog" />
	<!-- end of form update user -->

	<!-- form thêm mới -->
	<UserCreateNew v-if="showUserCreateNewDialog" @closeDialogBtnClick="hideUserCreateNewDialog" />
	<!-- end of form thêm mới -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import UserList from "@/views/setup/user/UserList.vue";
import UserUpdate from "@/views/setup/user/UserUpdate.vue";
import UserCreateNew from "@/views/setup/user/UserCreateNew.vue";
import { DxToast, DxPosition } from "devextreme-vue/toast";
import ToastConfig from "@/enums/ToastConfig";
import notify from "devextreme/ui/notify";

export default defineComponent({
	components: {
		UserList,
		UserUpdate,
		UserCreateNew,
		DxToast,
		DxPosition,
	},

	computed: {
		...mapGetters(["showUserUpdateDialog", "toastConfig"]),
	},

	data() {
		return {
			// hiện dialog thêm mới
			showUserCreateNewDialog: false,
		};
	},

	methods: {
		...mapMutations(["setToastConfig"]),

		hideUserCreateNewDialog() {
			this.showUserCreateNewDialog = false;
		},
		/**
		 * hiện dialog thêm mới
		 * author TQCONG 14/8/2022
		 */
		handleShowUserCreateNewDialog() {
			this.showUserCreateNewDialog = true;
		},
	},

	});
</script>

<style scoped lang="scss">
@import "../../../assets/css/views/setup/user/user-page.scss";
</style>
