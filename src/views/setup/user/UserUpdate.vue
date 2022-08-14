<template>
	<div id="dialogUpdate">
		<form novalidate @submit.prevent="onSubmit">
			<MDialog :config="dialogConfig" @cancelBtnClick="hideUserUpdateDialog">
				<template #dialog-body-content>
					<div>
						<div class="item-wrap">
							<div class="flex items-center">
								<div class="avatar m-r-8">
									<img
										src="https://testcdnamisapp.misa.vn/APIS/PlatformAPI/api/Avatar/5a426d1d-f731-4d88-962f-52b7756868ba/594LXLY7.jpg?avatarID=14c4257a-3b69-4879-b32c-641aeab08957&amp;width=64&amp;height=64"
										class="avatar"
									/>
								</div>
								<div class="user-information">
									<div>
										<span
											><b>{{ userToUpdate?.fullName }}</b></span
										><span class="m-l-4">(B-0822)</span>
									</div>
									<div class="m-t-4 m-b-4">
										<span>{{ userToUpdate?.email }}</span>
									</div>
									<div>
										<span>{{ userToUpdate?.positionName }}</span
										><span> - </span><span>{{ userToUpdate?.departmentName }}</span>
									</div>
								</div>
							</div>
						</div>
						<br /><label class="font-20 bold">
							<p style="margin: 0px !important; color: rgb(27, 28, 30) !important">
								Vai trò<span class="required" style="float: inherit"> * </span>
							</p></label
						><br />
						<div class="ms-row role-selection">
							<template v-for="(role, index) in roles" :key="index">
								<div class="role-wrapper ms-col ms-xs- ms-sm- ms-lg-">
									<div class="input-wrapper">
										<input
											type="checkbox"
											:id="`roleCheckbox${index}`"
											@click="handleRoleCheckboxClick($event, role)"
											:checked="checkRoleContains(role, user.roles)"
										/>
									</div>
									<label :for="`roleCheckbox${index}`">{{ role.name }}</label>
								</div>
							</template>
							<!-- <div class="role-wrapper ms-col ms-xs- ms-sm- ms-lg-">
							<div class="flex items-center">
								<label tabindex="1" class="container ms-checkbox"
									><input type="checkbox" class="ms-checkbox--input" value="false" /><span
										class="icon-square-uncheck checkmark"
									></span
									><span class="con-slot-label"
										><div title="Quản trị ứng dụng Quy trình" style="margin-top: -5px">
											Quản trị ứng dụng Quy trình
										</div></span
									></label
								>
							</div>
						</div>
						<div class="role-wrapper ms-col ms-xs- ms-sm- ms-lg-">
							<div class="flex items-center">
								<label tabindex="1" class="container ms-checkbox"
									><input type="checkbox" class="ms-checkbox--input" value="true" /><span
										class="icon-square-uncheck checkmark"
									></span
									><span class="con-slot-label"
										><div title="Nhân viên" style="margin-top: -5px">Nhân viên</div></span
									></label
								>
							</div>
						</div>
						<div class="role-wrapper ms-col ms-xs- ms-sm- ms-lg-">
							<div class="flex items-center">
								<label tabindex="1" class="container ms-checkbox"
									><input type="checkbox" class="ms-checkbox--input" value="false" /><span
										class="icon-square-uncheck checkmark"
									></span
									><span class="con-slot-label"
										><div title="quản lý" style="margin-top: -5px">quản lý</div></span
									></label
								>
							</div>
						</div> -->
						</div>
					</div>
				</template>

				<template #confirm-button>
					<button
						tabindex="1"
						type="submit"
						name="button"
						class="ms-component ms-button ms-button-primary ms-button-filled ms-button-null"
						:disabled="!isUserValid"
					>
						Lưu
					</button>
				</template>
			</MDialog>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MDialog from "@/components/base/MDialog.vue";
import { mapActions, mapGetters } from "vuex";
import Role from "@/models/Role";
import User from "@/models/User";
import { ModificationMode } from "@/enums/ModificationMode";

// dùng để gọi API
// @ts-ignore
import ServiceFactory from "@/services/ServiceFactory";
// const UserService: any = ServiceFactory.get("users");
const RoleService: any = ServiceFactory.get("roles");

export default defineComponent({
	components: { MDialog },

	data() {
		return {
			// user có hợp lệ không
			isUserValid: false,

			// đối tượng user để gửi lên api khi update
			userToUpdate: new User(),

			// danh sách vai trò
			roles: new Array<Role>(),

			// cấu hình dialog
			dialogConfig: {
				width: 600,
				headerTitle: "Sửa người dùng",
				cancelBtn: {
					text: "Huỷ",
				},
				confirmBtn: {
					text: "Lưu",
				},
			},
		};
	},

	watch: {
		userToUpdate: {
			handler: function (newVal) {
				this.isUserValid = this.validateUser(newVal);
			},
			deep: true,
		},
	},

	methods: {
		/**
		 * thực hiện cập nhật khi form được submit (form chỉ submit khi user hợp lệ)
		 * author TQCONG 13/8/2022
		 */
		async onSubmit() {
			try {
				this.userToUpdate.roles = this.buildRolesForUpdate(this.user.roles, this.userToUpdate.roles as Role[]);
				await this.handleUpdateUser(this.userToUpdate);
				// reload lại user list sau khi update thành công
				
			} catch (error) {
				console.log(error);
			}
		},
		/**
		 * validate user (trước khi thực hiện update hoặc mỗi khi có sự thay đổi trong user)
		 * có thể đưa thông báo lỗi trong quá trình validate
		 * author TQCONG 13/8/2022
		 */
		validateUser(user: User): boolean {
			try {
				let valid = true;
				if (Array.isArray(user.roles) && user.roles.length <= 0) {
					valid = false;
				}

				return valid;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * cập nhật lại mảng role trong userToUpdate khi một checkbox được click
		 * author TQCONG 13/8/2022
		 */
		handleRoleCheckboxClick($event: any, role: Role): void {
			const target = $event.target || $event.currentTarget;
			// nếu checkbox được chọn, thêm role từ checkbox vào mảng role
			if (target.checked) {
				this.userToUpdate.roles?.push(role);
			} else {
				this.userToUpdate.roles = this.userToUpdate.roles?.filter((r) => r.roleId != role.roleId);
			}
		},
		/**
		 * trả về list role cho việc cập nhật
		 * author TQCONG 13/8/2022
		 */
		buildRolesForUpdate(originalListRole: Role[], newListRole: Role[]): Role[] {
			newListRole.forEach((role) => {
				// nếu phần tử trong mảng mới và mảng cũ vẫn thế, tức là ta không thay đổi phần tử này
				if (this.checkRoleContains(role, originalListRole)) {
					role.modificationMode = ModificationMode.Nothing;
				}
				// nếu phần tử trong mảng mới không có trong mảng ban đầu, tức là phần tử đó sẽ được thêm mới
				else {
					role.modificationMode = ModificationMode.Insert;
				}
			});

			originalListRole.forEach((role) => {
				// nếu phần tử trong mảng mới và mảng cũ vẫn thế, tức là không thay đổi gì
				if (this.checkRoleContains(role, newListRole)) {
					role.modificationMode = ModificationMode.Nothing;
				}
				// nếu phần tử trong mảng ban đầu không còn trong mảng mới nữa, tức là ta muốn remove phần tử này
				else {
					role.modificationMode = ModificationMode.Remove;
					// thêm phần tử vào mảng mới
					newListRole.push(role);
				}
			});
			return newListRole;
		},
		/**
		 * kiểm tra xem liệu role có tồn tại trong số các role của user không
		 * author TQCONG 13/8/2022
		 */
		checkRoleContains(role: Role, listRoles: Role[]): boolean {
			try {
				let contains = false;
				if (Array.isArray(listRoles) && listRoles.length > 0) {
					contains = listRoles.map((r: any) => r.roleId).includes(role.roleId);
				}
				return contains;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		/**
		 * lấy ra tất cả role để hiển thị lên select box chọn role (cho việc lọc user)
		 * author TQCONG 13/8/2022
		 */
		async getAllRoles() {
			try {
				const data = await RoleService.getAll();
				const listRoles: Role[] = data.data;
				this.roles = listRoles;
			} catch (error) {
				console.log(error);
			}
		},

		...mapActions(["hideUserUpdateDialog", "handleUpdateUser"]),
	},

	computed: {
		...mapGetters(["user"]),
	},

	async created() {
		try {
			// khởi tạo giá trị chính bằng user lấy từ store
			this.userToUpdate = JSON.parse(JSON.stringify(this.user));

			// lấy ra tất cả role để hiển thị checkbox role
			await this.getAllRoles();
		} catch (error) {
			console.log(error);
		}
	},
});
</script>

<style lang="scss" scoped>
@import "../../../assets/css/views/setup/user/user-update.scss";
</style>
