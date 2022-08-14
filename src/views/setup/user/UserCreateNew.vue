<template>
	<div id="userCreateNewWrapper">
		<div class="pop-up-content">
			<!-- pop up header -->
			<header class="header">
				<div class="flex items-center justify-between">
					<div class="header-title">17, Bảng dữ liệu</div>
					<div class="flex align-center">
						<div class="h-full"></div>
						<div
							@click="$emit('closeDialogBtnClick')"
							class="popup-header-icon flex items-center cursor-pointer"
						>
							<div
								class="ms-icon-container flex items-center justify-center popup-icon-close ms-icon- btn-icon-1"
							>
								<div class="tooltip-container">
									<div class="con-ms-tooltip">
										<i class="ms-icon notranslate icon-scale mi-close-2"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<!-- end of pop up header -->

			<!-- pop up main content -->
			<main class="main-content">
				<Form @submit.prevent="onSubmit">
					<!-- bảng nhập liệu chính -->
					<div class="datagrid-wrapper">
						<table>
							<thead>
								<tr>
									<th>
										<div class="table-header-content flex items-center">
											STT
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Mã nhân viên
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Họ và tên
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Phòng ban
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Vị trí công việc
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Email
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Vai trò
											<div class="asterisk required"></div>
										</div>
									</th>
									<th>
										<div class="table-header-content flex items-center">
											Trạng thái
											<div class="asterisk required"></div>
										</div>
									</th>
								</tr>
							</thead>
							<tbody>
								<template v-for="(user, index) in users" :key="index">
									<tr>
										<td class="column column-stt">
											<div class="column-content-wrapper">{{ index + 1 }}</div>
										</td>
										<td class="column column-user-code">
											<div class="column-content-wrapper">
												<div class="ms-input">
													<Field
														type="text"
														class="ms-input-item"
														v-model="user.userCode"
														name="userCode"
													/>
												</div>
											</div>
										</td>
										<td class="column column-full-name">
											<div class="column-content-wrapper">
												<div class="ms-input">
													<Field
														type="text"
														class="ms-input-item"
														v-model="user.fullName"
														name="fullName"
													/>
												</div>
											</div>
										</td>
										<td class="column column-department">
											<div class="column-content-wrapper">
												<DxSelectBox
													:data-source="departments"
													item-template="item"
													display-expr="name"
													:hover-state-enabled="true"
													class="ms-select-box"
													placeholder=""
													v-model="user.department"
												>
													<template #item="{ data }">
														<div class="dropdown-item">
															{{ data.name }}
														</div>
													</template>
												</DxSelectBox>
											</div>
										</td>
										<td class="column column-position">
											<div class="column-content-wrapper">
												<DxSelectBox
													:data-source="positions"
													item-template="item"
													display-expr="name"
													:hover-state-enabled="true"
													class="ms-select-box"
													placeholder=""
													v-model="user.position"
												>
													<template #item="{ data }">
														<div class="dropdown-item">
															{{ data.name }}
														</div>
													</template>
												</DxSelectBox>
											</div>
										</td>
										<td class="column column-email">
											<div class="column-content-wrapper">
												<div class="ms-input">
													<input type="text" class="ms-input-item" v-model="user.email" />
												</div>
											</div>
										</td>
										<td class="column column-roles">
											<div class="column-content-wrapper">
												<DxTagBox
													:data-source="roles"
													value-expr="roleId"
													display-expr="name"
													@value-changed="onRoleChange"
													v-model="user.roles"
												/>
											</div>
										</td>
										<td class="column column-status">
											<div class="column-content-wrapper">
												<DxSelectBox
													:data-source="statuses"
													item-template="item"
													display-expr="text"
													value-expr="value"
													:hover-state-enabled="true"
													class="ms-select-box"
													placeholder=""
													v-model="user.status"
												>
													<template #item="{ data }">
														<div class="dropdown-item">
															{{ data.text }}
														</div>
													</template>
												</DxSelectBox>
											</div>
										</td>
									</tr></template
								>
							</tbody>
						</table>
					</div>
					<!-- end of bảng nhập liệu chính -->

					<!-- button thêm dòng -->
					<div @click="addNewUserRow" class="flex-m btn-new-column">
						<div class="icon-plus-blue"></div>
						<div class="m-t-2">Thêm dòng</div>
					</div>
					<!-- end of button thêm dòng -->

					<!-- buttons submit -->
					<div class="pop-up-footer flex justify-flexend">
						<div class="buttons">
							<button class="btn">Huỷ</button>
							<button class="btn" :disabled="!formValid">Lưu</button>
						</div>
					</div>
					<!-- end of buttons submit -->
				</Form>
			</main>
			<!-- end of pop up main content -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import User from "@/models/User";
import Department from "@/models/Department";
import Position from "@/models/Position";
import Role from "@/models/Role";
import DxSelectBox from "devextreme-vue/select-box";
import { DxTagBox } from "devextreme-vue/tag-box";
import { UserStatus } from "@/resources/enums";

import ServiceFactory from "@/services/ServiceFactory";
const UserService: any = ServiceFactory.get("users");
const RoleService: any = ServiceFactory.get("roles");
const DepartmentService: any = ServiceFactory.get("departments");
const PositionService: any = ServiceFactory.get("positions");

export default defineComponent({
	components: {
		DxSelectBox,
		DxTagBox,
		Field,
		Form,
		ErrorMessage,
	},

	data() {
		return {
			// toàn bộ dữ liệu user có hợp lệ không, mang giá trị true nếu toàn bộ hợp lệ
			formValid: false,

			// list user để thêm
			users: new Array<User>(),

			// userCode hiện tại, làm căn cứ để thêm userCode mới cho mỗi dòng dữ liệu mới
			currentUserCode: "",

			// list position cho select box
			positions: new Array<Position>(),

			// list department cho select box
			departments: new Array<Department>(),

			// list status cho select box
			statuses: Object.values(UserStatus),

			// list role cho select box
			roles: new Array<Role>(),
		};
	},

	methods: {
		/**
		 * xử lý khi nút submit được click khi form đã hợp lệ
		 * author TQCONG 14/8/2022
		 */
		onSubmit(values: any) {
			try {
				console.log(values);
			} catch (error) {
				console.log(error);
			}
		},
		/**
		 * thêm một dòng user mới
		 * author TQCONG 14/8/2022
		 */
		async addNewUserRow() {
			try {
				this.currentUserCode = this.getNewUserCode(this.currentUserCode);
				let user = new User();
				user.userCode = this.currentUserCode;

				// thêm user vào list user chính
				this.users.push(user);
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * trả về userCode mới lớn hơn usercode nhận vào 1 đơn vị
		 * author TQCONG 14/8/2022
		 */
		getNewUserCode(userCode: string): string {
			try {
				const numericPart = Number(userCode.substring(3));
				return "NV-" + (numericPart + 1);
			} catch (error) {
				console.log(error);
				return "";
			}
		},
	},

	async created() {
		try {
			const { data } = await UserService.getNewUserCode();
			this.currentUserCode = data;

			let user = new User();
			user.userCode = data;

			// thêm user vào list user chính
			this.users.push(user);

			// get list department
			const rsDep = await DepartmentService.getAll();
			this.departments = rsDep.data;

			// get list position
			const rsPos = await PositionService.getAll();
			this.positions = rsPos.data;

			// get list position
			const rsRole = await RoleService.getAll();
			this.roles = rsRole.data;
		} catch (error) {
			console.log(error);
		}
	},
});
</script>

<style lang="scss" scoped>
@import "../../../assets/css/views/setup/user/user-create-new.scss";
</style>

<style scoped>
/* custom css cho dx-datagrid - dùng css vì không thể override bằng scss */
@import "@/assets/css/views/setup/user/customize/dx-datagrid-create-new-user.css";
/* @import "@/assets/css/views/setup/user/customize/dx-select.css"; */
</style>
