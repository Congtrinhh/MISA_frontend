<template>
	<div class="content-setting w-full">
		<div id="setting-user" class="h-full">
			<div class="h-full flex-column body-custom">
				<div class="content-header p-b-16">
					<div class="header-custom flex justify-between items-center">
						<div class="font-20 bold">Người dùng</div>
						<!-- button -->
						<MButton
							id="btnAddPermission"
							@click="$emit('btnAddNewUserClick')"
							btnClasses="ms-component ms-button ms-button-primary ms-button-filled ms-button-mi-plus-white includeIcon"
							iconClasses="ms-icon notranslate icon-scale mi-plus-white"
							>Thêm mới</MButton
						>
						<!-- end of button -->
					</div>
				</div>
				<div class="content-main">
					<div class="h-full w-full">
						<!-- search box, filter, setting -->
						<div
							id="contentMainHeader"
							class="content-main-header flex items-center w-full bg-white"
							style="height: 60px"
						>
							<span class="input-search-user">
								<div class="m-l-12">
									<div style="height: 36px; width: 240px">
										<div class="flex items-center w-full h-full">
											<div class="ms-input flex w-full">
												<div class="ms-icon-default flex items-center justify-center p-l-8">
													<i class="ms-icon notranslate icon-scale mi-search"></i>
												</div>
												<input
													maxlength="255"
													placeholder="Tìm kiếm người dùng"
													tabindex="1"
													type="text"
													class="ms-input-item"
													v-model="fullNameSearchKeyword"
													@input="searchUsers(fullNameSearchKeyword)"
												/>
											</div>
										</div>
									</div>
								</div>
							</span>

							<span class="select-box-role">
								<div class="wrap-ms-select-box m-l-12">
									<DxSelectBox
										:data-source="roles"
										v-model:value="paginationRequest.roleId"
										placeholder="Chọn vai trò"
										item-template="item"
										display-expr="name"
										value-expr="roleId"
										id="selectBoxRole"
										:hover-state-enabled="true"
										class="ms-select-box"
									>
										<template #item="{ data }">
											<div class="dropdown-item">
												{{ data.name }}
											</div>
										</template>
									</DxSelectBox>
								</div>
							</span>
							<div class="su-filter m-r-16" @click="togglePopupTableConfig">
								<div class="adjust-column">
									<div
										type="gradient"
										color="secondary"
										id="adjust-column"
										class="mi-24 cursor-pointer m-0 mi-setting"
									></div>
								</div>
							</div>

							<!-- pop up config table display -->
							<DxPopup
								id="popupTableConfig"
								content-template="popup-content"
								v-model:visible="isPopupTableConfigVisible"
								:drag-enabled="false"
								:hide-on-outside-click="true"
								:show-close-button="false"
								:show-title="false"
								:width="316"
								:height="420"
								container=".dx-viewport"
								:animation="{
									show: {
										type: 'fade',
										duration: 400,
										from: { opacity: 0 },
										to: { opacity: 1 },
									},
								}"
								:wrapper-attr="{ class: 'adjust-column-popover' }"
							>
								<!-- <DxPosition offset="-100 200" /> -->
								<template #popup-content>
									<div class="content-container">
										<div id="adjust-colum-popover" class="flex flex-col">
											<header>
												<div class="p-b-8 header">
													<div class="flex justify-between items-center p-b-12">
														<div class="title">Tùy chỉnh cột</div>
														<div
															class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
															style="cursor: pointer"
														></div>
													</div>
													<div sizeicon="20px" iconnoborder="true" inputbackground="#ffffff">
														<div title="" style="height: 35px; width: 100%">
															<div class="flex items-center w-full h-full">
																<div class="ms-input flex w-full">
																	<div
																		class="ms-icon-default flex items-center justify-center p-l-8 ms-icon-"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-search"
																		></i>
																	</div>
																	<input
																		maxlength="255"
																		placeholder="Tìm kiếm"
																		autofocus="autofocus"
																		tabindex="1"
																		type="text"
																		class="ms-input-item"
																	/><!---->
																</div>
																<!---->
															</div>
															<div class="flex" style="display: none">
																<div
																	class="root flex justify-between items-center text-border"
																>
																	<p class="w-full" style="height: 35px">
																		<span title=""></span>
																	</p>
																	<div
																		class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
																	>
																		<div class="tooltip-container">
																			<div class="con-ms-tooltip">
																				<i
																					class="ms-icon notranslate icon-scale mi-pencil"
																				></i>
																			</div>
																			<div
																				class="ms-tooltips dx-overlay dx-popup dx-popover dx-widget dx-state-invisible dx-visibility-change-handler dx-tooltip"
																			>
																				<div
																					class="dx-overlay-content dx-popup-normal"
																					aria-hidden="true"
																					id="dx-a620409d-b959-3959-b165-d58d5862813b"
																					role="tooltip"
																					style="width: auto; height: auto"
																				>
																					<div class="dx-popover-arrow"></div>
																					<div class="dx-popup-content"></div>
																				</div>
																			</div>
																		</div>
																	</div>
																	<!---->
																</div>
															</div>
														</div>
														<!---->
													</div>
												</div>
											</header>
											<main>
												<div class="list-group-wrap list-content p-b-12">
													<div class="list-group">
														<div class="">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				disabled="disabled"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark disabled"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Mã nhân viên"
																					class="columnName m-t-2"
																				>
																					Mã nhân viên
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- opacity-0"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				disabled="disabled"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark disabled"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Họ và tên"
																					class="columnName m-t-2"
																				>
																					Họ và tên
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- opacity-0"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="element">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Phòng ban"
																					class="columnName m-t-2"
																				>
																					Phòng ban
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="element">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Vị trí công việc"
																					class="columnName m-t-2"
																				>
																					Vị trí công việc
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="element">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Email"
																					class="columnName m-t-2"
																				>
																					Email
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="element">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Vai trò"
																					class="columnName m-t-2"
																				>
																					Vai trò
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div class="element">
															<div class="list-group-item">
																<div class="flex items-center justify-between">
																	<div class="flex items-center">
																		<label
																			tabindex="1"
																			class="container ms-checkbox"
																			><input
																				type="checkbox"
																				class="ms-checkbox--input"
																				value="true"
																			/><span
																				class="icon-square-check-primary checkmark"
																			></span
																			><span class="con-slot-label"
																				><div
																					title="Trạng thái"
																					class="columnName m-t-2"
																				>
																					Trạng thái
																				</div></span
																			></label
																		>
																	</div>
																	<div
																		class="ms-icon-default flex items-center justify-center ms-icon- drag-class"
																		style="cursor: all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div
														class="flex-col items-center justify-center w-full p-y-24"
														style="height: 250px; display: none"
													>
														<div class="mi-empty-state-sheets"></div>
														<div style="font-style: italic; color: rgb(221, 221, 221)">
															Không có dữ liệu
														</div>
													</div>
												</div>
											</main>
											<footer>
												<div class="comand-wrap flex justify-flexend">
													<MButton
														btnClasses="ms-component ms-button ms-button-secondary ms-button-filled ms-button-null"
														>Lấy lại mặc định</MButton
													>
													<MButton
														btnClasses="ms-component ms-button ms-button-primary ms-button-filled ms-button-null"
														>Áp dụng</MButton
													>
												</div>
											</footer>
										</div>
									</div>
								</template>
							</DxPopup>
							<!-- end of pop up config table display -->
						</div>
						<!-- end of search box, filter, setting -->

						<!-- main table and paging -->
						<div class="custom-paging-grid">
							<div class="grid-container" headerwhitebg="true" heightcustomfull="true">
								<div id="datagrid" class="h-full">
									<!-- actual dx table -->
									<DxDataGrid
										id="gridContainer"
										:data-source="users"
										:allow-column-reordering="true"
										:allow-column-resizing="true"
										:show-borders="false"
										:onRowClick="handleTableRowClick"
										:show-column-lines="false"
										:show-row-lines="true"
										:onContentReady="addClassDataGrid"
										:columnMinWidth="200"
										:hover-state-enabled="true"
										columnResizingMode="widget"
									>
										<!-- user code -->
										<DxColumn
											data-field="userCode"
											caption="Mã nhân viên"
											header-cell-template="userCodeHeader"
										/>
										<template #userCodeHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<!-- end of user code -->

										<!-- full name -->
										<DxColumn
											data-field="fullName"
											caption="Họ và tên"
											header-cell-template="fullNameHeader"
											cell-template="fullName"
										/>
										<template #fullNameHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<template #fullName="{ data }">
											<div class="wrapper flex items-center">
												<div v-html="getUserAvatarMarkup(data.data)" class="m-r-8"></div>
												{{ data.value }}
											</div>
										</template>
										<!-- end of full name -->

										<!-- department name -->
										<DxColumn
											data-field="departmentName"
											caption="Phòng ban"
											header-cell-template="departmentNameHeader"
										/>
										<template #departmentNameHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<!-- end of department name -->

										<!-- position name -->
										<DxColumn
											data-field="positionName"
											caption="Vị trí công việc"
											header-cell-template="positionNameHeader"
										/>
										<template #positionNameHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<!-- end of position name -->

										<!-- email -->
										<DxColumn
											data-field="email"
											caption="Email"
											header-cell-template="emailHeader"
										/>
										<template #emailHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<!-- end of email -->

										<!-- role names -->
										<DxColumn
											data-field="roleNames"
											caption="Vai trò"
											header-cell-template="roleNamesHeader"
										/>
										<template #roleNamesHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<!-- end of role names -->

										<!-- user status -->
										<DxColumn
											caption="Trạng thái"
											cell-template="userStatus"
											header-cell-template="statusHeader"
										/>
										<template #statusHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4" style="display: none"></div>
											</div>
										</template>
										<template #userStatus="{ data }">
											<div
												class="p-l-16 pos-relative"
												:style="{ color: getUserStatusStyles(data.data?.status).color }"
											>
												Chờ xác nhận
												<span
													class="dot"
													:style="{
														backgroundColor: getUserStatusStyles(data.data?.status).color,
													}"
												></span>
											</div>
										</template>
										<!-- end of user status -->

										<!-- action -->
										<DxColumn caption="" cell-template="userAction" />
										<template #userAction="{ data }">
											<div class="user-action-wrapper flex justify-flexend m-x-8">
												<div
													class="style-button"
													@click.stop="handleShowUserUpdateDialog(data.data)"
												>
													<div title="Sửa" class="button-comand-wrap btn-more">
														<div class="mi-pencil"></div>
													</div>
												</div>
												<div
													class="style-button"
													@click.stop="handleOpenConfirmDeleteDialog(data.data)"
												>
													<div title="Xóa" class="button-comand-wrap btn-more">
														<div class="icon-delete-custom"></div>
													</div>
												</div>
											</div>
										</template>
										<!-- end of action -->

										<DxPager :enabled="false" />
										<PxPaging :enabled="false" />
									</DxDataGrid>
									<!-- end of actual dx table -->

									<!-- paging -->
									<div class="paging">
										<div class="grid-navigation">
											<div class="page-total flex">
												Tổng số bản ghi:
												<b style="padding: 0px 6px">{{ paginationResponse.totalCount }}</b>
											</div>
											<div class="page-size-selector flex items-center">
												<div class="m-r-8">Số bản ghi/trang</div>
												<MSelect
													:options="[15, 25, 50, 100]"
													:value="paginationRequest.pageSize"
													@valueChange="updatePageSize"
												/>
												<div class="page-info">
													<b>{{ paginationResponse.recordStart }}</b> -
													<b>{{ paginationResponse.recordEnd }}</b> bản ghi
												</div>
											</div>
											<div class="page-next-preview">
												<div class="ms-row m-0">
													<div class="ms-pagination--mb ms-col ms-xs-12 ms-sm-12 ms-lg-">
														<div
															class="con-ms-pagination w-full ms-pagination-primary"
															style="height: 40px"
														>
															<nav
																class="ms-pagination--nav flex justify-between items-center"
															>
																<div
																	class="ms-bottom-nav"
																	@click="decreaseCurrentPage"
																	:class="{
																		disabled: !paginationResponse.hasPrevious,
																	}"
																>
																	<div
																		class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
																	>
																		<div class="tooltip-container">
																			<div class="con-ms-tooltip">
																				<i
																					class="ms-icon notranslate icon-scale mi-chevron-left"
																				></i>
																			</div>
																			<!-- tooltip here -->
																		</div>
																	</div>
																</div>

																<div
																	class="ms-bottom-nav"
																	@click="increaseCurrentPage"
																	:class="{
																		disabled: !paginationResponse.hasNext,
																	}"
																>
																	<div
																		class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1"
																	>
																		<div class="tooltip-container">
																			<div class="con-ms-tooltip">
																				<i
																					class="ms-icon notranslate icon-scale mi-chevron-right"
																				></i>
																			</div>
																			<!-- tooltip here -->
																		</div>
																	</div>
																</div>
															</nav>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- end of paging -->

									<!-- loader -->
									<div class="request-loading"></div>
									<!-- end of loader -->
								</div>
							</div>
						</div>
						<!-- end of main table and paging -->
					</div>
					<!-- dx-resize (not used) -->
					<div class="m-l-16 resize1 dx-resizable"></div>
					<!-- end of dx-resize -->
				</div>
			</div>
		</div>
	</div>

	<!-- dialog xác nhận xoá user -->
	<MDialog v-if="showDialog" @confirmBtnClick="handleDeleteUser" @cancelBtnClick="closeDialog" :config="dialogConfig">
		Bạn có chắc chắn muốn xóa <b>{{ user.fullName }}</b> khỏi ứng dụng AMIS Quy trình không?
	</MDialog>
	<!-- end of dialog xác nhận xoá user -->

	<!-- form hiển thị chi tiết user -->
	<UserDetail v-if="showUserDetailScreen" @deleteBtnClick="showConfirmDeleteDialogOnly" />
	<!-- end of form hiển thị chi tiết user -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { DxDataGrid, DxColumn, DxPager, DxPaging } from "devextreme-vue/data-grid";
import DxSelectBox, { DxItem } from "devextreme-vue/select-box";
import User from "@/models/User";
import Role from "@/models/Role";
import PaginationResponse from "@/models/paging/PaginationResponse";
import UserPaginationRequest from "@/models/paging/UserPaginationRequest";
import { Status } from "@/enums/Status";
import MDialog from "@/components/base/MDialog.vue";
import MSelect from "@/components/base/MSelect.vue";
import MButton from "@/components/base/MButton.vue";
import DxPopup, { DxPosition } from "devextreme-vue/popup";

import UserDetail from "@/views/setup/user/UserDetail.vue";
import { getUserAvatarMarkup, getUserStatusStyles } from "@/helpers/common";

// dùng để gọi API
// @ts-ignore
import ServiceFactory from "@/services/ServiceFactory";
const UserService: any = ServiceFactory.get("users");
const RoleService: any = ServiceFactory.get("roles");

export default defineComponent({
	components: {
		DxDataGrid,
		DxColumn,
		DxSelectBox,
		DxItem,
		MDialog,
		UserDetail,
		MSelect,
		MButton,
		DxPopup,
		DxPaging,
		DxPager,
	},
	data() {
		return {
			// list user trong bảng table
			users: new Array<User>(),

			// đôi tượng lưu các thông tin để lọc/ phân trang khi gọi api
			paginationRequest: new UserPaginationRequest(),

			// hiển thị dialog
			showDialog: false,

			// cấu hình cho dialog xác nhận xoá
			dialogConfig: {} as object,

			// dữ liệu trả về từ api (có list user)
			paginationResponse: {} as PaginationResponse<User>,

			// chứa timeout để clear khi gọi hàm tìm kiếm user
			searchTimeOutHolder: -1,

			// list roles
			roles: new Array<Role>(),

			// hiện pop up config table hay không
			isPopupTableConfigVisible: false,
		};
	},

	watch: {
		/**
		 * [needReload] - từ store
		 * nếu cần reload lại list user, reload lại và tắt trạng thái reload
		 * author TQCONG 14/8/2022
		 */
		needReload: async function (newVal: boolean) {
			// reload lại list user
			if (newVal == true) {
				await this.getUsers();

				// sau khi reload xong, tắt trạng thái reload
				this.setNeedReload(false);
			}
		},
		/**
		 * lấy ra list user mới mỗi khi bộ lọc thay đổi
		 * author TQCONG 12/8/2022
		 */
		paginationRequest: {
			handler() {
				this.getUsers();
			},
			deep: true,
		},
	},

	computed: {
		...mapGetters(["showUserDetailScreen", "user", "needReload"]),
	},

	methods: {
		/**
		 * ẩn/hiện pop up table config
		 * author TQCONG 15/8/2022
		 */
		togglePopupTableConfig() {
			this.isPopupTableConfigVisible = !this.isPopupTableConfigVisible;
		},
		/**
		 * xử lý khi nút "xoá" ở mỗi dòng của bảng user được click
		 * author TQCONG 13/8/2022
		 */
		handleOpenConfirmDeleteDialog(user: User) {
			try {
				this.setUser(user);
				this.showDialog = true;
			} catch (error) {
				console.log(error);
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

		/**
		 * xử lý khi bấm vào nút xác nhận xoá trong dialog xác nhận xoá
		 * author TQCONG 13/8/2022
		 */
		async handleDeleteUser() {
			try {
				// ẩn dialog xác nhận xoá
				this.showDialog = false;

				// gọi action xoá user từ store
				await this.deleteUser();

				// thông báo xoá thành công
				//...
				console.log("xoa thanh cong");
				// reload lại list user
				this.paginationRequest.currentPage = 1;
			} catch (error) {
				// thông báo xoá không thành công
				console.log(error);
			}
		},
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
		 * hiện dialog xác nhận xoá và không làm gì thêm
		 * author TQCONG 13/8/2022
		 */
		showConfirmDeleteDialogOnly() {
			this.showDialog = true;
		},

		/**
		 * xử lý khi bấm vào nút xoá ở một dòng của bảng user
		 * author TQCONG 12/8/2022
		 */
		handleShowConfirmDeleteDialog(user: User): void {
			console.log("delete");
			// cập nhật store với user mới từ dòng được bấm của bảng user
			this.setUser(user);
			// hiện dialog xác nhận xoá
			this.$nextTick(() => {
				this.showDialog = true;
			});
		},

		...mapMutations(["setUser", "setNeedReload"]),
		...mapActions(["handleTableRowClick", "deleteUser", "handleShowUserUpdateDialog"]),
		searchUsers(fullNameSearchKeyword: string): void {
			try {
				const me = this;
				clearTimeout(me.searchTimeOutHolder);
				this.searchTimeOutHolder = setTimeout(() => {
					// chỉ cần thay đổi giá trị là list user mới sẽ được lấy về
					this.paginationRequest.fullName = fullNameSearchKeyword;
					this.paginationRequest.currentPage = 1;
				}, 500);
			} catch (error) {
				console.log(error);
			}
		},
		decreaseCurrentPage() {
			if (this.paginationRequest.currentPage > 1) {
				this.paginationRequest.currentPage--;
			}
		},
		increaseCurrentPage() {
			if (this.paginationRequest.currentPage < this.paginationResponse.totalPages) {
				this.paginationRequest.currentPage++;
			}
		},
		/**
		 * lấy ra list user dựa vào bộ lọc và phân trang
		 * author TQCONG 12/8/2022
		 */
		async getUsers() {
			try {
				// lấy data từ api
				const { data } = await UserService.getPaging(this.paginationRequest);
				// set thông tin phân trang để hiển thị
				this.paginationResponse = data;
				// set users
				this.users = data.data;

				// cập nhật current page cho lần lấy user tiếp theo
				// this.paginationRequest.currentPage = this.paginationResponse.currentPage;
			} catch (error) {
				console.log(error);
			}
		},

		updatePageSize(pageSize: number) {
			try {
				this.paginationRequest.pageSize = pageSize;
			} catch (error) {
				console.log(error);
			}
		},

		addClassDataGrid() {
			try {
				document.getElementById("gridContainer")?.classList.add("ms-datagrid");
			} catch (error) {
				console.log(error);
			}
		},

		consoleLog(data: any) {
			console.log(data);
		},

		/**
		 * ẩn dialog xác nhận xoá
		 * author TQCONG 12/8/2022
		 */
		closeDialog(): void {
			this.showDialog = false;
		},
	},

	async created() {
		try {
			// cấu hình cho dialog xác nhận xoá
			this.dialogConfig = {
				width: 500,
				headerTitle: "Xoá người dùng",
				cancelBtn: {
					text: "Huỷ",
					classes: "ms-component ms-button m-r-12 ms-button-secondary ms-button-filled ms-button-null",
				},
				confirmBtn: {
					text: "Xoá",
					classes: "ms-component ms-button ms-button-danger ms-button-filled ms-button-null",
				},
			};

			// lấy ra list user
			await this.getUsers();

			// lấy ra list role
			await this.getAllRoles();
			// thêm option tất cả vào mảng role
			const roleAll: Role = new Role();
			roleAll.name = "Tất cả";
			roleAll.roleId = -1;
			this.roles.unshift(roleAll);
		} catch (error) {
			console.log(error);
		}
	},
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/views/setup/user/user-list.scss";
</style>

<style scoped>
/* custom css cho dx-datagrid - dùng css vì không thể override bằng scss */
@import "@/assets/css/views/setup/user/customize/dx-datagrid.css";
@import "@/assets/css/views/setup/user/customize/dx-select.css";
@import "@/assets/css/views/setup/user/customize/dx-popup.css";
</style>
