<template>
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
import { mapGetters, mapActions } from "vuex";
import UserList from "@/views/setup/user/UserList.vue";
import UserUpdate from "@/views/setup/user/UserUpdate.vue";
import UserCreateNew from "@/views/setup/user/UserCreateNew.vue";

export default defineComponent({
	components: {
		UserList,
		UserUpdate,
		UserCreateNew,
		
	},

	computed: {
		...mapGetters(["showUserUpdateDialog"]),
	},

	data() {
		return {
			// hiện dialog thêm mới
			showUserCreateNewDialog: true,
		};
	},

	methods: {
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
