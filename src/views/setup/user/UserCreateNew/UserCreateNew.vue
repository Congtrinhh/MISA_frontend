<template>
	<div id="userCreateNewWrapper" ref="dialogCreateUser">
		<Form @submit="onSubmit" v-slot="{ meta }" class="pop-up-content">
			<!-- pop up header -->
			<header class="header">
				<div class="flex items-center justify-between">
					<div class="header-title">Thêm người dùng</div>
					<div class="flex align-center">
						<div class="h-full"></div>
						<div id="closeBtn" @click="$emit('closeDialogBtnClick')" class="btn-cancel popup-header-icon">
							<i class="btn-cancel-icon"></i>
							<DxTooltip
								:hide-on-outside-click="false"
								show-event="dxhoverstart"
								hide-event="dxhoverend"
								target="#closeBtn"
							>
								Đóng
							</DxTooltip>
						</div>
					</div>
				</div>
			</header>
			<!-- end of pop up header -->

			<!-- pop up main content -->
			<main class="main-content">
				<!-- bảng nhập liệu chính -->
				<DxScrollView direction="both" showScrollbar="always">
					<div class="datagrid-wrapper">
						<table>
							<thead>
								<tr>
									<th>
										<div class="table-header-content flex items-center">STT</div>
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
												<div class="ms-input vee-control-wrapper">
													<Field
														v-model="user.userCode"
														:name="`userCode${index}`"
														:rules="validateUserCode"
														v-slot="{ errorMessage }"
													>
														<input
															type="text"
															class="ms-input-item pos-absolute"
															v-model="user.userCode"
															:class="{ invalid: errorMessage }"
														/>
														<div class="vee-error-message" v-if="errorMessage">
															{{ errorMessage }}
														</div>
													</Field>
												</div>
											</div>
										</td>
										<td class="column column-full-name">
											<div class="column-content-wrapper vee-control-wrapper">
												<div class="ms-input">
													<Field
														v-model="user.fullName"
														:name="`fullName${index}`"
														:rules="validateFullName"
														v-slot="{ errorMessage }"
													>
														<input
															type="text"
															class="ms-input-item pos-absolute"
															v-model="user.fullName"
															:class="{ invalid: errorMessage }"
														/>
														<div class="vee-error-message" v-if="errorMessage">
															{{ errorMessage }}
														</div>
													</Field>
												</div>
											</div>
										</td>
										<td class="column column-department">
											<div class="column-content-wrapper vee-control-wrapper">
												<Field
													:name="`department${index}`"
													:rules="validateNotNull"
													v-model="user.department"
													v-slot="{ errorMessage }"
												>
													<DxSelectBox
														:data-source="departments"
														item-template="item"
														display-expr="name"
														:hover-state-enabled="true"
														class="ms-select-box"
														placeholder=""
														v-model="user.department"
														:class="errorMessage ? 'invalid' : ''"
													>
														<template #item="{ data }">
															<div
																class="dropdown-item"
																:id="`departmentOption${data.departmentId}${index}`"
															>
																{{ data.name }}
																<DxTooltip
																	:hide-on-outside-click="false"
																	show-event="dxhoverstart"
																	hide-event="dxhoverend"
																	:target="`#departmentOption${data.departmentId}${index}`"
																>
																	{{ data.name }}
																</DxTooltip>
															</div>
														</template>
													</DxSelectBox>
													<div class="vee-error-message" v-if="errorMessage">
														{{ errorMessage }}
													</div>
												</Field>
											</div>
										</td>
										<td class="column column-position">
											<div class="column-content-wrapper vee-control-wrapper">
												<Field
													:name="`position${index}`"
													:rules="validateNotNull"
													v-model="user.position"
													v-slot="{ errorMessage }"
												>
													<DxSelectBox
														:data-source="positions"
														item-template="item"
														display-expr="name"
														:hover-state-enabled="true"
														class="ms-select-box"
														placeholder=""
														v-model="user.position"
														:class="errorMessage ? 'invalid' : ''"
													>
														<template #item="{ data }">
															<div
																class="dropdown-item"
																:id="`positionOption${data.positionId}${index}`"
															>
																{{ data.name }}
																<DxTooltip
																	:hide-on-outside-click="false"
																	show-event="dxhoverstart"
																	hide-event="dxhoverend"
																	:target="`#positionOption${data.positionId}${index}`"
																>
																	{{ data.name }}
																</DxTooltip>
															</div>
														</template>
													</DxSelectBox>
													<div class="vee-error-message" v-if="errorMessage">
														{{ errorMessage }}
													</div>
												</Field>
											</div>
										</td>
										<td class="column column-email">
											<div class="column-content-wrapper">
												<div class="ms-input vee-control-wrapper">
													<Field
														v-model="user.email"
														:name="`email${index}`"
														:rules="validateEmail"
														v-slot="{ errorMessage }"
													>
														<input
															type="text"
															class="ms-input-item pos-absolute"
															v-model="user.email"
															:class="{ invalid: errorMessage }"
														/>
														<div class="vee-error-message" v-if="errorMessage">
															{{ errorMessage }}
														</div>
													</Field>
												</div>
											</div>
										</td>
										<td class="column column-roles">
											<div class="column-content-wrapper vee-control-wrapper">
												<Field
													:name="`roles${index}`"
													:rules="validateRoles"
													v-model="user.roles"
													v-slot="{ errorMessage }"
												>
													<DxTagBox
														:data-source="roles"
														display-expr="name"
														v-model="user.roles"
														placeholder=""
														:class="
															errorMessage
																? 'invalid dx-show-invalid-badge dx-tagbox dx-tagbox-only-select dx-selectbox dx-textbox dx-texteditor dx-texteditor-empty dx-widget dx-tagbox-default-template dx-dropdowneditor dx-dropdowneditor-field-clickable ms-select-box dx-editor-outlined'
																: 'dx-show-invalid-badge dx-tagbox dx-tagbox-only-select dx-selectbox dx-textbox dx-texteditor dx-texteditor-empty dx-widget dx-tagbox-default-template dx-dropdowneditor dx-dropdowneditor-field-clickable ms-select-box dx-editor-outlined'
														"
														:multiline="false"
													>
														<template #item="{ data }">
															<div
																class="dropdown-item"
																:id="`roleOptionFormCreate${data.roleId}${index}`"
															>
																{{ data.name }}
																<DxTooltip
																	:hide-on-outside-click="false"
																	show-event="dxhoverstart"
																	hide-event="dxhoverend"
																	:target="`#roleOptionFormCreate${data.roleId}${index}`"
																>
																	{{ data.name }}
																</DxTooltip>
															</div>
														</template>
													</DxTagBox>
													<div class="vee-error-message" v-if="errorMessage">
														{{ errorMessage }}
													</div></Field
												>
											</div>
										</td>
										<td class="column column-status">
											<div class="column-content-wrapper vee-control-wrapper">
												<Field
													:name="`status${index}`"
													:rules="validateStatus"
													v-model="user.status"
													v-slot="{ errorMessage }"
												>
													<DxSelectBox
														:data-source="statuses"
														item-template="item"
														display-expr="text"
														value-expr="value"
														:hover-state-enabled="true"
														class="ms-select-box"
														placeholder=""
														v-model="user.status"
														:class="{ invalid: errorMessage }"
													>
														<template #item="{ data }">
															<div
																class="dropdown-item"
																:id="`statusOption${data.value}${index}`"
															>
																{{ data.text }}
																<DxTooltip
																	:hide-on-outside-click="false"
																	show-event="dxhoverstart"
																	hide-event="dxhoverend"
																	:target="`#statusOption${data.value}${index}`"
																>
																	{{ data.text }}
																</DxTooltip>
															</div>
														</template>
													</DxSelectBox>
													<div class="vee-error-message" v-if="errorMessage">
														{{ errorMessage }}
													</div></Field
												>
											</div>
										</td>
									</tr></template
								>
							</tbody>
						</table>
					</div>
				</DxScrollView>
				<!-- end of bảng nhập liệu chính -->

				<!-- button thêm dòng -->
				<div @click="addNewUserRow" class="flex-m btn-new-column">
					<div class="icon-plus-blue"></div>
					<div class="m-t-2">Thêm dòng</div>
				</div>
				<!-- end of button thêm dòng -->
			</main>
			<!-- end of pop up main content -->

			<!-- buttons submit -->
			<div class="pop-up-footer flex justify-flexend">
				<div class="buttons flex justify-flexend direction-row-reverse">
					<MButton
						id="btnSave"
						:disabled="!meta.valid"
						btnClasses="ms-component ms-button ms-button-primary ms-button-filled ms-button-null"
						type="submit"
						>Lưu</MButton
					>
					<MButton
						@click="raiseCloseDialogBtnClickEvent"
						btnClasses="btn-left ms-component ms-button m-r-12 ms-button-secondary ms-button-filled ms-button-null"
						>Huỷ</MButton
					>
				</div>
			</div>
			<!-- end of buttons submit -->

			<!-- dialog chi tiết lỗi -->
			<MDialog
				v-if="showErrorDetailDialog"
				:config="{ headerTitle: 'Chi tiết lỗi' }"
				@cancelBtnClick="closeErrorDetailDialog"
			>
				<template #default>
					<div v-for="(error, index) in errorMessages" :key="index">
						{{ error }}
					</div>
				</template>
				<template #dialog-footer-content>
					<MButton @click="closeErrorDetailDialog">Đóng</MButton>
				</template>
			</MDialog>
			<!-- end of dialog chi tiết lỗi -->
		</Form>
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
import MButton from "@/components/base/MButton/MButton.vue";
import ToastConfig from "@/enums/ToastConfig";
import ErrorMessageResponse from "@/models/exception/ErrorMessageResponse";
import { error, notification, validate } from "@/resources/messages";
import { mapMutations } from "vuex";
import { DxScrollView } from "devextreme-vue/scroll-view";
import { DxTooltip } from "devextreme-vue/tooltip";
import MDialog from "@/components/base/MDialog/MDialog.vue";
import { addLeadingZeros } from "@/helpers/common";

// @ts-ignore
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
		MButton,
		DxScrollView,
		DxTooltip,
		MDialog,
	},

	data() {
		return {
			// toàn bộ dữ liệu user có hợp lệ không, mang giá trị true nếu toàn bộ hợp lệ
			formValid: false,

			// list user để thêm
			users: new Array<User>(),

			// form đâ thay đổi hay chưa - dùng để đưa ra dialog thông báo
			modified: false,

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

			// hiện dialog chi tiết lỗi
			showErrorDetailDialog: false,

			// danh sách lỗi từ server gửi về
			errorMessages: new Array<string>(),
		};
	},

	methods: {
		/**
		 * emit sự kiện ẩn dialog thêm mới lên component cha
		 * author TQCONG 22/8/2022
		 */
		raiseCloseDialogBtnClickEvent() {
			this.$emit("closeDialogBtnClick");
		},

		/**
		 * ẩn dialog chi tiết lỗi
		 * author TQCONG 22/8/2022
		 */
		closeErrorDetailDialog() {
			this.showErrorDetailDialog = false;
		},

		...mapMutations(["setToastConfig", "setShowLoader"]),

		/**
		 * xử lý khi nút submit được click khi form đã hợp lệ
		 * khi submit, lấy giá trị từ user list thay vì tham số của hàm
		 * author TQCONG 14/8/2022
		 */
		async onSubmit(values: any) {
			let myToastConfig: ToastConfig = {
				visible: true,
				type: "success",
				message: notification.insertSuccess,
			};
			try {
				// hiện loader
				this.setShowLoader(true);

				const { data } = await UserService.createMany(this.users);
				if (data === 1) {
					// ẩn loader
					this.setShowLoader(false);

					// thông báo tạo thành công
					this.setToastConfig(myToastConfig);

					// đóng dialog
					this.$emit("closeDialogBtnClick");
				}
			} catch (error: any) {
				// ẩn loader
				this.setShowLoader(false);

				if (error.response.data) {
					const errorResp: ErrorMessageResponse = error.response.data;

					// lấy ds lỗi
					this.errorMessages = errorResp.data;

					// cấu hình toast
					myToastConfig.type = "error";
					myToastConfig.message = errorResp.userMsg;
				}
				// hiện toast
				this.setToastConfig(myToastConfig);

				// hiện dialog chi tiết lỗi
				this.showErrorDetailDialog = true;

				console.log(error);
			}
		},
		/**
		 * validate user status
		 * author TQCONG 14/8/2022
		 */
		validateStatus(value: number): boolean | string {
			try {
				if (value < 0) {
					return validate.status.required;
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * validate email
		 * author TQCONG 14/8/2022
		 */
		validateEmail(value: string): boolean | string {
			try {
				if (!value) {
					return validate.email.required;
				}
				if (value.length > 255) {
					return validate.email.maxLength;
				}
				const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
				if (!regex.test(value)) {
					return validate.email.format;
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * validate full name
		 * author TQCONG 14/8/2022
		 */
		validateFullName(value: string): string | boolean {
			try {
				if (!value) {
					return validate.fullName.required;
				}
				if (value.length > 255) {
					return validate.fullName.maxLength;
				}
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * validate role
		 * author TQCONG 14/8/2022
		 */
		validateRoles(roles: any): string | boolean {
			try {
				if (Array.isArray(roles) && roles.length > 0) {
					return true;
				}
				return validate.role.required;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * validate rỗng
		 * author TQCONG 14/8/2022
		 */
		validateNotNull(value: any): string | boolean {
			try {
				if (!value) {
					return validate.default.required;
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * validate user code
		 * author TQCONG 14/8/2022
		 */
		validateUserCode(value: any): string | boolean {
			try {
				if (!value) {
					return validate.userCode.required;
				}
				const regex = /^NV-\d*$/;
				if (!regex.test(value)) {
					return validate.userCode.format;
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
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
				return "NV-" + addLeadingZeros(numericPart + 1);
			} catch (error) {
				console.log(error);
				return "";
			}
		},
	},

	async created() {
		try {
			// lấy ra mã user code mới nhất từ DB
			const { data } = await UserService.getNewUserCode();
			this.currentUserCode = data;

			// khởi tạo user đầu tiên của bảng
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

			// focus vào ô input đầu tiên
			// @ts-ignore
			const firstEl = this.$refs.dialogCreateUser.querySelector(
				"table tbody tr:first-of-type td.column-user-code input.ms-input-item"
			);
			firstEl?.focus();
		} catch (error) {
			console.log(error);
		}
	},
});
</script>

<style lang="scss" scoped>
@import "./user-create-new.scss";
</style>

<style scoped>
/* custom css cho dx-datagrid - dùng css vì không thể override bằng scss */
@import "./dx-datagrid-create-new-user.css";
</style>