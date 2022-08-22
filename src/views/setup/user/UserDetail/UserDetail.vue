<template>
	<div id="userDetailScreen">
		<div class="detail-preview-user">
			<div class="container">
				<div class="content-user">
					<div class="mi-close" @click="setShowUserDetailScreen(false)"></div>
					<div class="section-1 ms-row">
						<div class="avatar-wrapper ms-col ms-xs- ms-sm- ms-lg-">
							<div class="avatar m-r-8" v-html="getUserAvatarMarkup(user, 'user-avatar-66')"></div>
						</div>
						<div class="basic-info-wrapper ms-col ms-xs- ms-sm- ms-lg-">
							<div class="fullName font-20 bold">{{ user?.fullName }}</div>
							<div class="email">{{ user?.email }}</div>
							<div class="status">
								<div class="p-l-16 pos-relative">
									<span
										class="dot"
										:style="{ backgroundColor: getUserStatusStyles(user?.status).color }"
									></span
									><span class="active" :style="{ color: getUserStatusStyles(user?.status).color }">{{
										getUserStatusStyles(user?.status).text
									}}</span>
								</div>
							</div>
							<div class="flex">
								<MButton
									@click="setShowUserUpdateDialog(true)"
									btnClasses="btn-update ms-component ms-button ms-button-waiting ms-button-primary ms-button-filled ms-button-null"
									>Cập nhật</MButton
								>
								<MButton
									@click="raiseDeleteBtnClickEvent"
									btnClasses="btn-delete ms-component ms-button ms-button-waiting ms-button-primary ms-button-filled ms-button-null"
									>Xóa</MButton
								>
							</div>
						</div>
					</div>
					<div class="body-preview">
						<div class="body-header font-20 bold">THÔNG TIN CÔNG VIỆC</div>
						<div class="info-field-wrapper ms-row">
							<div class="field-name-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="bold">Mã nhân viên</div>
							</div>
							<div class="field-value-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="employeeCode">{{ user?.userCode }}</div>
							</div>
						</div>
						<div class="info-field-wrapper ms-row">
							<div class="field-name-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="bold">Phòng ban</div>
							</div>
							<div class="field-value-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="organizationUnitName">{{ user?.departmentName }}</div>
							</div>
						</div>
						<div class="info-field-wrapper ms-row">
							<div class="field-name-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="bold">Vị trí công việc</div>
							</div>
							<div class="field-value-wrapper ms-col ms-xs- ms-sm- ms-lg-">
								<div class="jobPositionName">{{ user?.positionName }}</div>
							</div>
						</div>
						<div class="font-20 bold permission-info-header">THÔNG TIN PHÂN QUYỀN</div>
						<div class="w-full roles-wrapper flex flex-column">
							<div class="role-header bold">Vai trò</div>
							<template v-for="(role, index) in user.roles" :key="index">
								<div class="role-item" :title="role.name">
									<span class="role-item-text">{{ role.name }}</span>
								</div>
							</template>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapGetters } from "vuex";
import { getUserAvatarMarkup, getUserStatusStyles } from "@/helpers/common";
import MButton from "@/components/base/MButton/MButton.vue";

export default defineComponent({
	components: { MButton },
	computed: {
		...mapGetters(["user"]),
	},

	methods: {
		/**
		 * (hàm import từ helper) - trả về object chứa tên trạng thái và màu để css
		 * author TQCONG 13/8/2022
		 */
		getUserStatusStyles,

		/**
		 * (hàm import từ helper) - trả về thẻ html chứa đầy đủ style cho avatar của một user
		 * author TQCONG 13/8/2022
		 */
		getUserAvatarMarkup,

		/**
		 * emit sự kiện nút xoá được click lên compnent cha
		 * author TQCONG 13/8/2022
		 */
		raiseDeleteBtnClickEvent() {
			this.$emit("deleteBtnClick");
		},
		
		...mapMutations(["setShowUserDetailScreen", "setShowUserUpdateDialog"]),
	},
});
</script>

<style scoped lang="scss">
@import "./user-detail.scss";
</style>