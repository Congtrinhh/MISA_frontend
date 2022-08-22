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
							@click="raiseBtnAddNewUserClickEvent"
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
						<div id="contentMainHeader" class="content-main-header flex items-center w-full bg-white">
							<span class="input-search-user">
								<div class="m-l-12">
									<div class="input-search-user-child">
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
													v-model="searchKeyword"
													@input="searchUsers(searchKeyword)"
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
											<div class="dropdown-item" :id="`roleOption${data.roleId}`">
												{{ data.name }}
												<DxTooltip
													:hide-on-outside-click="false"
													show-event="dxhoverstart"
													hide-event="dxhoverend"
													:target="`#roleOption${data.roleId}`"
												>
													{{ data.name }}
												</DxTooltip>
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
								height="auto"
								:animation="{
									show: {
										type: 'fade',
										duration: 400,
										from: { opacity: 0 },
										to: { opacity: 1 },
									},
								}"
								:wrapper-attr="{ class: 'adjust-column-popover' }"
								container=".dx-viewport"
								:position="{
									my: 'top right',
									at: 'bottom right',
									of: '#popupTableConfig',
									offset: '14 21',
								}"
								@shown="focusOnAdjustColumnSearchBox"
							>
								<template #popup-content>
									<div class="content-container">
										<div id="adjust-colum-popover" class="flex flex-col">
											<header>
												<div class="p-b-8 header">
													<div class="flex justify-between items-center p-b-12">
														<div class="title">Tùy chỉnh cột</div>
														<div
															id="btnClosePopUpConfigTable"
															@click="hidePopUpConfigTable"
															class="ms-icon-container flex items-center justify-center ms-icon- btn-icon-1 cursor-pointer"
														>
															<div class="tooltip-container">
																<div class="con-ms-tooltip">
																	<i
																		class="ms-icon notranslate icon-scale ms-icon notranslate icon-scale mi-close-2"
																	></i>
																</div>
															</div>

															<DxTooltip
																:hide-on-outside-click="false"
																show-event="dxhoverstart"
																hide-event="dxhoverend"
																target="#btnClosePopUpConfigTable"
															>
																Đóng
															</DxTooltip>
														</div>
													</div>
													<div sizeicon="20px" iconnoborder="true" inputbackground="#ffffff">
														<div title="" class="search-pop-up-table-config-wrapper">
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
																		id="popupTableConfigFieldNameKeyword"
																		v-model="popupTableConfigFieldNameKeyword"
																		@input="
																			searchTableConfigFieldName(
																				popupTableConfigFieldNameKeyword
																			)
																		"
																	/>
																</div>
															</div>
															<div class="flex display-none">
																<div
																	class="root flex justify-between items-center text-border"
																>
																	<p class="w-full pop-up-title-wrapper">
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
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</header>
											<main>
												<div class="list-group-wrap list-content p-b-12">
													<DxScrollView>
														<div class="list-group">
															<div
																class="list-group-item"
																v-for="(fieldName, index) in Object.keys(
																	tempPopupTableConfigFields
																)"
																:key="index"
															>
																<div class="flex items-center justify-between">
																	<div class="popup-option-wrapper">
																		<div class="input-wrapper">
																			<input
																				:id="`optionAdjustColumn${index}`"
																				type="checkbox"
																				v-model="
																					tempPopupTableConfigFields[
																						fieldName
																					].visible
																				"
																				:disabled="
																					tempPopupTableConfigFields[
																						fieldName
																					].locked
																				"
																			/>
																		</div>
																		<label
																			class="checkbox-label"
																			:for="`optionAdjustColumn${index}`"
																			>{{
																				tempPopupTableConfigFields[fieldName]
																					.text
																			}}</label
																		>
																	</div>
																	<div
																		class="icon-drag-wrapper ms-icon-default flex items-center justify-center ms-icon- drag-class cursor-all-scroll"
																	>
																		<i
																			class="ms-icon notranslate icon-scale mi-drag"
																		></i>
																	</div>
																</div>
															</div>
														</div>
														<div
															class="no-data-wrapper flex-col items-center justify-center w-full p-y-24"
														>
															<div class="mi-empty-state-sheets"></div>
															<div class="no-data-text">Không có dữ liệu</div>
														</div>
													</DxScrollView>
												</div>
											</main>
											<footer>
												<div class="comand-wrap flex justify-flexend">
													<MButton
														@click="restoreDefaultPopupTableConfig"
														btnClasses="ms-component ms-button ms-button-secondary ms-button-filled ms-button-null"
														class="m-r-12"
														>Lấy lại mặc định</MButton
													>
													<MButton
														@click="updatePopupTableConfig"
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
										showScrollbar="always"
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
												<div class="m-l-4 display-none"></div>
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
												<div class="m-l-4 display-none"></div>
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
											:visible="popupTableConfigFields.departmentName.visible"
										/>
										<template #departmentNameHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4 display-none"></div>
											</div>
										</template>
										<!-- end of department name -->

										<!-- position name -->
										<DxColumn
											data-field="positionName"
											caption="Vị trí công việc"
											header-cell-template="positionNameHeader"
											:visible="popupTableConfigFields.positionName.visible"
										/>
										<template #positionNameHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4 display-none"></div>
											</div>
										</template>
										<!-- end of position name -->

										<!-- email -->
										<DxColumn
											data-field="email"
											caption="Email"
											header-cell-template="emailHeader"
											:visible="popupTableConfigFields.email.visible"
										/>
										<template #emailHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4 display-none"></div>
											</div>
										</template>
										<!-- end of email -->

										<!-- role names -->
										<DxColumn
											data-field="roleNames"
											caption="Vai trò"
											header-cell-template="roleNamesHeader"
											:visible="popupTableConfigFields.roleNames.visible"
										/>
										<template #roleNamesHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4 display-none"></div>
											</div>
										</template>
										<!-- end of role names -->

										<!-- user status -->
										<DxColumn
											caption="Trạng thái"
											cell-template="userStatus"
											header-cell-template="statusHeader"
											:visible="popupTableConfigFields.status.visible"
										/>
										<template #statusHeader="{ data }">
											<div class="justify-flexstart header-title">
												<div class="">{{ data.column.caption }}</div>
												<div class="m-l-4 display-none"></div>
											</div>
										</template>
										<template #userStatus="{ data }">
											<div
												class="p-l-16 pos-relative"
												:style="{ color: getUserStatusStyles(data.data?.status).color }"
											>
												{{ getUserStatusStyles(data.data?.status).text }}
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
										<DxColumn
											caption=""
											cell-template="userAction"
											header-cell-template="userActionHeader"
											:fixed="true"
											fixed-position="right"
											 css-class="user-action-dx-column"
										/>
										<template #userActionHeader> <div class="user-action-header-wrapper display-none"></div> </template>
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
										<DxPaging :enabled="false" />
									</DxDataGrid>
									<!-- end of actual dx table -->

									<!-- paging -->
									<div class="paging">
										<div class="grid-navigation">
											<div class="page-total flex">
												Tổng số bản ghi:
												<b>{{ paginationResponse.totalCount }}</b>
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
														<div class="con-ms-pagination w-full ms-pagination-primary">
															<nav
																class="ms-pagination--nav flex justify-between items-center"
															>
																<div
																	id="previousPageBtn"
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
																			<DxTooltip
																				:hide-on-outside-click="false"
																				show-event="dxhoverstart"
																				hide-event="dxhoverend"
																				target="#previousPageBtn"
																			>
																				Quay lại
																			</DxTooltip>
																		</div>
																	</div>
																</div>

																<div
																	id="nextPageBtn"
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
																			<DxTooltip
																				:hide-on-outside-click="false"
																				show-event="dxhoverstart"
																				hide-event="dxhoverend"
																				target="#nextPageBtn"
																			>
																				Tiếp tục
																			</DxTooltip>
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
import DxDataGrid, { DxColumn, DxPager, DxPaging } from "devextreme-vue/data-grid";
import DxSelectBox, { DxItem } from "devextreme-vue/select-box";
import User from "@/models/User";
import Role from "@/models/Role";
import PaginationResponse from "@/models/paging/PaginationResponse";
import UserPaginationRequest from "@/models/paging/UserPaginationRequest";
import MDialog from "@/components/base/MDialog/MDialog.vue";
import MSelect from "@/components/base/MSelect/MSelect.vue";
import MButton from "@/components/base/MButton/MButton.vue";
import DxPopup, { DxPosition } from "devextreme-vue/popup";
import { DxTooltip } from "devextreme-vue/tooltip";
import { DxScrollView } from "devextreme-vue/scroll-view";

import UserDetail from "@/views/setup/user/UserDetail/UserDetail.vue";
import { getUserAvatarMarkup, getUserStatusStyles } from "@/helpers/common";

import ToastConfig from "@/enums/ToastConfig";
import ErrorMessageResponse from "@/models/exception/ErrorMessageResponse";
import { error, notification } from "@/resources/messages";
import { popupTableConfigFields } from "@/resources/enums";

// @ts-ignore
import { toLowerCaseNonAccentVietnamese } from "@/helpers/nonAccentVietnamese";

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
		DxTooltip,
		DxScrollView,
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

			// mảng các cột thông tin người dùng để cấu hình ẩn/hiện trên bảng người dùng
			popupTableConfigFields: JSON.parse(JSON.stringify(popupTableConfigFields)),

			// mảng tạm các cột thông tin người dùng để cấu hình ẩn/hiện trên bảng người dùng
			// (cần mảng này vì không muốn cột được ẩn/hiện ngay khi người dùng tích/bỏ tích các ô checkbox trong phần popup chỉnh cột)
			tempPopupTableConfigFields: JSON.parse(JSON.stringify(popupTableConfigFields)),
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
		 * emit sự kiện bấm vào nút thêm mới lên component cha
		 * author TQCONG 22/8/2022
		 */
		raiseBtnAddNewUserClickEvent() {
			this.$emit("btnAddNewUserClick");
		},
		/**
		 * focus vào ô search của pop up chỉnh cột
		 * author TQCONG 21/8/2022
		 */
		focusOnAdjustColumnSearchBox() {
			document.getElementById("popupTableConfigFieldNameKeyword")?.focus();
		},

		/**
		 * ẩn pop up tuỳ chỉnh cột
		 * author TQCONG 21/8/2022
		 */

		hidePopUpConfigTable() {
			this.isPopupTableConfigVisible = false;
		},

		/**
		 * lọc các trường được chọn lam option trong pop up cấu hình ẩn hiện trường của bảng user
		 * author TQCONG 21/8/2022
		 */
		searchTableConfigFieldName(keyword: string): void {
			try {
				// convert sang tiếng việt viết thường không dấu. Ví dụ: Hà -> ha
				const keywordNonVietnamese = toLowerCaseNonAccentVietnamese(keyword);

				// mảng các key của object popupTableConfigFields (mảng tên trường)
				const filteredFieldNames = Object.keys(this.popupTableConfigFields).filter((fieldName) => {
					const fieldNameTextNonVietnamese = toLowerCaseNonAccentVietnamese(
						// @ts-ignore
						this.popupTableConfigFields[fieldName].text
					);
					return fieldNameTextNonVietnamese.includes(keywordNonVietnamese);
				});

				// biến tạm để gán cho tempPopupTableConfigFields
				let tempObj = {};

				// lấy ra tất cả các trường có trong mảng đã lọc bên trên
				filteredFieldNames.forEach((fieldName) => {
					// @ts-ignore
					tempObj[fieldName] = JSON.parse(JSON.stringify(this.popupTableConfigFields[fieldName]));
				});

				// @ts-ignore
				this.tempPopupTableConfigFields = tempObj;
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * lấy lại cấu hình các trường nào được hiện/ẩn trên bảng user mặc định
		 * author TQCONG 21/8/2022
		 */
		restoreDefaultPopupTableConfig() {
			try {
				this.popupTableConfigFields = JSON.parse(JSON.stringify(popupTableConfigFields));
				this.tempPopupTableConfigFields = JSON.parse(JSON.stringify(popupTableConfigFields));
				// ẩn pop up
				this.isPopupTableConfigVisible = false;
			} catch (error) {
				console.log(error);
			}
		},
		/**
		 * cập nhật lại cấu hình các trường nào được hiện/ẩn trên bảng user ngay khi nút "Áp dùng" trên pop up được bấm
		 * author TQCONG 21/8/2022
		 */
		updatePopupTableConfig() {
			try {
				// gán giá trị của các trường của object temp cho object chính (lúc này số field trong object temp có thể ít hơn số field trong object chính - vì được lọc khi người dùng nhập qua ô search)
				Object.keys(this.tempPopupTableConfigFields).forEach((fieldName) => {
					// @ts-ignore
					this.popupTableConfigFields[fieldName] = JSON.parse(
						// @ts-ignore
						JSON.stringify(this.tempPopupTableConfigFields[fieldName])
					);
				});

				// ẩn pop up
				this.isPopupTableConfigVisible = false;
			} catch (error) {
				console.log(error);
			}
		},
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

				// reload lại list user
				this.paginationRequest.currentPage = 1;
			} catch (error) {
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
			try {
				// cập nhật store với user mới từ dòng được bấm của bảng user
				this.setUser(user);
				// hiện dialog xác nhận xoá
				this.$nextTick(() => {
					this.showDialog = true;
				});
			} catch (error) {
				console.log(error);
			}
		},

		...mapMutations(["setUser", "setNeedReload", "setShowLoader", "setToastConfig"]),
		...mapActions(["handleTableRowClick", "deleteUser", "handleShowUserUpdateDialog"]),

		/**
		 * Tìm kiếm user sau 1 khoảng delay kể từ khi người dùng dừng nhập vào ô search box
		 * Created by TQCONG 20/8/2022
		 */
		searchUsers(keyword: string): void {
			try {
				const me = this;
				clearTimeout(me.searchTimeOutHolder);
				this.searchTimeOutHolder = setTimeout(() => {
					// chỉ cần thay đổi giá trị là list user mới sẽ được lấy về
					this.paginationRequest.keyword = keyword;
					this.paginationRequest.currentPage = 1;
				}, 500);
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * Giảm chỉ số currentpage khi bấm nút "trang trước"
		 * Created by TQCONG 20/8/2022
		 */
		decreaseCurrentPage() {
			if (this.paginationRequest.currentPage > 1) {
				this.paginationRequest.currentPage--;
			}
		},

		/**
		 * Tăng chỉ số currentpage khi bấm nút "trang sau"
		 * Created by TQCONG 20/8/2022
		 */
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
				// hiện loader
				this.setShowLoader(true);

				// lấy data từ api
				const { data } = await UserService.getPaging(this.paginationRequest);

				// ẩn loader
				this.setShowLoader(false);

				// set thông tin phân trang để hiển thị
				this.paginationResponse = data;
				// set users
				this.users = data.data;

				// cập nhật current page cho lần lấy user tiếp theo
				// this.paginationRequest.currentPage = this.paginationResponse.currentPage;
			} catch (err) {
				// hiện thông báo lỗi
				let myToastConfig: ToastConfig = {
					visible: true,
					type: "error",
					message: error.messageDefault,
				};
				this.setToastConfig(myToastConfig);

				console.log(err);
				// ẩn loader
				this.setShowLoader(false);
			}
		},

		/**
		 * cập nhật số bản ghi/trang trong sự kiện onchange của thẻ select chọn số bản ghi/trang
		 * author TQCONG 20/8/2022
		 */
		updatePageSize(pageSize: number) {
			try {
				this.paginationRequest.pageSize = pageSize;
				this.paginationRequest.currentPage = 1;
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * xử lý các nghiệp vụ cần thiết khi dx-datagrid vừa được khởi tạo
		 * author TQCONG 20/8/2022
		 */
		addClassDataGrid() {
			try {
				document.getElementById("gridContainer")?.classList.add("ms-datagrid");
				// @ts-ignore
				document.querySelector("#gridContainer .dx-scrollable")?.dxScrollable({ showScrollbar: "always" });
			} catch (error) {
				console.log(error);
			}
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
@import "./user-list.scss";
</style>

<style scoped>
/* custom css cho dx-datagrid - dùng css vì không thể override bằng scss */
@import "./dx-datagrid.css";
@import "./dx-popup.css";
</style>