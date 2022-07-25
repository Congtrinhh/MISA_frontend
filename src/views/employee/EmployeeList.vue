<template>
	<div>
		<div ref="employeeListContent" class="m-content">
			<!-- section 1 - right below header (phần ngay dưới header) -->
			<section class="m-top">
				<div class="m-sub-header">Nhân viên</div>
				<div class="m-top-btns">
					<button style="display: none" class="m-button m-button-secondary" id="btnImportExcel">
						Nhập từ Excel
					</button>
					<button @click="$emit('onFormModeAdd')" class="m-button" id="btnNewEmployee">
						Thêm mới nhân viên
					</button>
				</div>
			</section>
			<!-- end section 1 - right below header (phần ngay dưới header) -->

			<!-- section 2 - table area (khu vực chứa table và các nút search,..) -->
			<section class="m-body">
				<!-- body top (right below table content) -->
				<div class="m-body-top m-body-controls">
					<!-- body left (button do many) -->
					<div class="m-body-top-left">
						<button
							@click="handleBtnDoManyClick"
							ref="btnDoMany"
							id="btnDoMany"
							class="m-button-do-many m-button m-button-secondary rounded outlined"
						>
							<div>
								<span class="text">Thực hiện hàng loạt</span>
								<div class="icon mi-16"></div>
							</div>
						</button>
					</div>

					<!-- search box and reload button -->
					<div class="m-body-top-right">
						<div class="m-body-top-right-search-wrapper">
							<input
								type="text"
								name="employee-keyword"
								v-model="employeeKeyword"
								@input="
									removeAllSelectedEmployeesToDelete();
									$emit('onSearchEmployees', employeeKeyword);
								"
								placeholder="Tìm theo mã, tên nhân viên"
							/>
							<button class="m-button-search mi-16"></button>
						</div>

						<div class="m-body-top-right-reload m-button-utility-wrapper tooltip-parent">
							<button
								class="m-button-reload mi-24"
								id="btnReload"
								@click="
								removeAllSelectedEmployeesToDelete();
								$emit('onReloadPage', employeeKeyword)"
							></button>
							<div class="tooltip">Lấy lại dữ liệu</div>
						</div>

						<div class="m-body-top-right-excel m-button-utility-wrapper tooltip-parent">
							<button
								class="m-button-excel mi-24"
								id="btnExcel"
								@click="handleBtnExportExcelClick"
							></button>
							<div class="tooltip">Xuất ra Excel</div>
						</div>
					</div>
				</div>

				<!-- body main content -->
				<div class="m-body-main">
					<div class="m-body-main-wrapper-level-1">
						<div class="m-body-main-wrapper-level-2">
							<!-- the table -->
							<table id="mainTable" class="m-table" ref="mainTable">
								<thead>
									<th class="spacer"></th>
									<th>
										<input
											type="checkbox"
											name="check-all-rows"
											ref="checkBoxAllRows"
											id="checkBoxAllRows"
											@click="checkBoxAllRowsClick($event.target)"
										/>
									</th>
									<th class="emp-id">MÃ NHÂN VIÊN</th>
									<th class="emp-name">TÊN NHÂN VIÊN</th>
									<th class="emp-gender">GIỚI TÍNH</th>
									<th class="emp-dob">NGÀY SINH</th>
									<th class="emp-cmnd">SỐ CMND</th>
									<th class="emp-role">CHỨC DANH</th>
									<th class="emp-organization-name">TÊN ĐƠN VỊ</th>
									<th class="emp-credit-card-number">SỐ TÀI KHOẢN</th>
									<th class="emp-bank-name">TÊN NGÂN HÀNG</th>
									<th class="emp-bank-branch">CHI NHÁNH TK NGÂN HÀNG</th>
									<th class="emp-action">CHỨC NĂNG</th>
								</thead>
								<tbody>
									<tr
										v-for="emp in employees"
										:key="emp.EmployeeId"
										@dblclick="
											$emit('onFormModeUpdate');
											$emit('onSelectedEmployeeChange', emp, formModeEnum.update);
										"
									>
										<template>
											<td class="spacer"></td>
											<td>
												<input
													type="checkbox"
													class="checkbox-item"
													name="check-row"
													@click="handleCheckboxDeleteClick($event, emp.EmployeeId)"
												/>
											</td>
											<td class="emp-id">{{ emp.EmployeeCode }}</td>
											<td>{{ emp.FullName ? emp.FullName : "-" }}</td>
											<td>{{ emp.GenderName ? emp.GenderName : "-" }}</td>
											<td class="emp-dob">{{ formatDate(emp.DateOfBirth) }}</td>
											<td>{{ emp.IdentityNumber ? emp.IdentityNumber : "-" }}</td>
											<td>{{ emp.PositionName ? emp.PositionName : "-" }}</td>
											<td>{{ emp.DepartmentName ? emp.DepartmentName : "" }}</td>
											<td>{{ emp.BankAccountNumber ? emp.BankAccountNumber : "-" }}</td>
											<td>{{ emp.BankName ? emp.BankName : "-" }}</td>
											<td>{{ emp.BankBranchName ? emp.BankBranchName : "-" }}</td>
											<td class="emp-action">
												<div class="m-dropdown">
													<button
														@click="
															$emit('onFormModeUpdate');
															$emit('onSelectedEmployeeChange', emp, formModeEnum.update);
														"
														class="m-dropdown-button-modify m-dropdown-button m-dropdown-button-left"
													>
														<div class="m-small-wrapper">Sửa</div>
													</button>
													<button
														class="m-dropdown-button m-dropdown-button-right"
														@click="
															$emit('onSelectedEmployeeChange', emp, formModeEnum.delete);
															showDropdownFunctionality($event);
														"
													>
														<div class="m-small-wrapper mi-16"></div>
													</button>
												</div>
											</td>
										</template>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- image không có dữ liệu -->
						<div class="no-result-wrapper" v-if="totalRecords == 0">
							<img
								src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
								alt="no result found"
							/>
							<div class="text">Không có dữ liệu</div>
						</div>

						<!-- pagination -->
						<div class="m-paging-container">
							<div class="m-paging-total-records">
								Tổng số: <b>{{ totalRecords }}</b> bản ghi
							</div>
							<div class="m-paging">
								<el-pagination
									@size-change="raisePageSizeChangeEvent"
									@current-change="raisePageIndexChangeEvent"
									:page-size="pageSize"
									:total="totalRecords"
									:page-sizes="[10, 20, 30, 50, 100]"
									:pager-count="5"
									layout="sizes, prev, pager, next"
									prev-text="Trước"
									next-text="Sau"
								>
									<template #pagination> Item tren trang </template>
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<!-- end body main content -->
			</section>
			<!-- end section 2 - table area (khu vực chứa table và các nút search,..) -->

			<!-- dropdown of delete function -->
			<div
				ref="dropdownFunctionality"
				@click="closeDropdownFunctionality"
				@focusout="handleDropdownFunctionalityFocusOut"
				class="m-dropdown-content m-dropdown-content-delete"
			>
				<ul>
					<li class="" @click="$emit('onDuplicateRecord')">Nhân bản</li>
					<li class="delete" @click="$emit('onShowConfirmDeleteDialog')">Xoá</li>
					<li class="">Ngừng sử dụng</li>
				</ul>
			</div>
			<!-- end dropdown of delete function -->

			<!-- dropdown do many (dropdown của nút thực hiện hàng loạt) -->
			<div
				ref="dropdownDoMany"
				@click="closeDropdownDoMany"
				@focusout="handleDropdownDoManyFocusOut"
				class="m-dropdown-content m-dropdown-content-do-many"
			>
				<ul>
					<li @click="handleShowConfirmDialog" class="">Xoá</li>
				</ul>
			</div>
			<!-- end of dropdown do many -->

			<!-- confirm dialog -->
			<InfoDialog
				v-show="showConfirmDialog"
				@onCloseInfoDialog="showConfirmDialog = false"
				@onConfirm="handleDeleteManyEmployees"
				:config="infoDialogConfig"
			/>
			<!-- end confirm dialog -->
		</div>
	</div>
</template>

<script>
import { FormModeEnum } from "../../utils.js";
import InfoDialog, { cssInfoDialog } from "../../components/base/InfoDialog.vue";
import { toastModes } from "../../components/base/ToastNotifier.vue";
import defaultMessages from "@/resources/employeeListMessage";

// dùng để gọi API
import ServiceFactory from "../../services/ServiceFactory.js";
const EmployeeService = ServiceFactory.get("employees");

export default {
	components: { InfoDialog },

	data() {
		return {
			// keyword để tìm kiếm (trong ô search)
			employeeKeyword: "",

			// chế độ của form: add/update
			formModeEnum: FormModeEnum,

			// danh sách employee id để xoá
			employeeIdsToDelete: [],

			// hiện dialog thông báo
			showConfirmDialog: false,

			// cấu hình cho dialog thông báo
			infoDialogConfig: {},
		};
	},

	props: {
		// danh sách nhân viên
		employees: { type: Array },
		// số bản ghi trên 1 trang
		pageSize: { type: Number },
		// tổng bản ghi
		totalRecords: { type: Number },
	},

	methods: {
		/**
		 * cài đặt cấu hình cho dialog thông báo
		 * author: Trinh Quy Cong 24/7/22
		 */
		buildInfoDialogConfig() {
			try {
				this.infoDialogConfig = {
					showBody: true,
					closeButtonText: defaultMessages.infoDialogConfig.closeButtonText,
					showConfirmButton: true,
					confirmButtonText: defaultMessages.infoDialogConfig.confirmButtonText,
					cssIcon: cssInfoDialog.warning,
				};
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi nút xuất khẩu dữ liệu excel được click
		 * author: Trinh Quy Cong 21/7/22
		 */
		handleBtnExportExcelClick() {
			try {
				this.$emit("onShowLoader");
				// gọi api lấy ra file excel chứa danh sách toàn bộ nhân viên
				EmployeeService.getExcelFile()
					.then((res) => {
						this.$emit("onHideLoader");
						// file excel dưới dạng blob
						const blob = res.data;

						// download file excel
						if (window.navigator.msSaveOrOpenBlob) {
							window.navigator.msSaveOrOpenBlob(blob, defaultMessages.excelFileName);
						} else {
							const a = document.createElement("a");
							document.body.appendChild(a);
							const url = window.URL.createObjectURL(blob);
							a.href = url;
							a.download = defaultMessages.excelFileName;
							a.click();
							setTimeout(() => {
								window.URL.revokeObjectURL(url);
								document.body.removeChild(a);
							}, 0);
						}
					})
					.catch((error) => {
						this.$emit("onHideLoader");
						console.log(error);
					});
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON xử lý khi bỏ chọn checkbox chọn tất cả
		 * author: Trinh Quy Cong 20/7/22
		 */
		removeAllSelectedEmployeesToDelete() {
			try {
				// bỏ chọn checkbox chọn tất cả
				this.$refs.checkBoxAllRows.checked = false;
				// bỏ chọn tất cả checkbox item và background
				this.$refs.mainTable
					.querySelectorAll("tbody tr input[type='checkbox'].checkbox-item")
					.forEach((input) => {
						input.checked = false;
						input.closest("tr").classList.remove("selected");
					});
				// xoá hết employee id trong mảng chứa
				this.employeeIdsToDelete = [];
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON xử lý khi tích chọn checkbox chọn tất cả
		 * author: Trinh Quy Cong 20/7/22
		 */
		addAllSelectedEmployeesToDelete() {
			try {
				// tích chọn checkbox chọn tất cả
				this.$refs.checkBoxAllRows.checked = true;
				// chọn tất cả các checkbox item và background
				this.$refs.mainTable
					.querySelectorAll("tbody tr input[type='checkbox'].checkbox-item")
					.forEach((input) => {
						input.checked = true;
						input.closest("tr").classList.add("selected");
					});

				// thêm tất cả employee id của từng checkbox item vào mảng chứa
				this.employeeIdsToDelete = [];
				this.employees.forEach((employee) => {
					this.employeeIdsToDelete.push(employee.EmployeeId);
				});
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON xử lý khi bỏ chọn input checkbox của 1 bản ghi
		 * author: Trinh Quy Cong 20/7/22
		 */
		removeSelectedEmployeeToDelete(inputElement, employeeId) {
			try {
				// bỏ chọn checkbox chọn tất cả
				this.$refs.checkBoxAllRows.checked = false;
				this.employeeIdsToDelete = this.employeeIdsToDelete.filter((id) => id !== employeeId);
				inputElement.closest("tr").classList.remove("selected");
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON xử lý khi tích chọn input checkbox của 1 bản ghi
		 * author: Trinh Quy Cong 20/7/22
		 */
		addSelectedEmployeeToDelete(inputElement, employeeId) {
			try {
				this.employeeIdsToDelete.push(employeeId);
				inputElement.closest("tr").classList.add("selected");
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi bấm ra ngoài khu vực dropdown thực hiện hàng loạt
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleDropdownDoManyFocusOut() {
			try {
				this.closeDropdownDoMany();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * ẩn dropdown thực hiện hàng loạt
		 * author: Trinh Quy Cong 19/7/22
		 */
		closeDropdownDoMany() {
			try {
				// ẩn dropdown
				this.$refs.dropdownDoMany.style.display = "none";
				// bỏ tabindex
				this.$refs.dropdownDoMany.removeAttribute("tabindex");
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * xử lý khi nút chọn tất cả được click
		 * author: Trinh Quy Cong 19/7/22
		 */
		checkBoxAllRowsClick(target) {
			try {
				// nếu input vừa được chọn
				if (target.checked) {
					this.addAllSelectedEmployeesToDelete();
				} else {
					this.removeAllSelectedEmployeesToDelete();
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hiện dialog xác nhận (dialog thông báo) cùng với set up
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleShowConfirmDialog() {
			try {
				this.buildInfoDialogConfig();
				this.infoDialogConfig.body = defaultMessages.confirmDelete;

				this.showConfirmDialog = true;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * thực hiện xoá nhiều employees
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleDeleteManyEmployees() {
			try {
				EmployeeService.deleteEmployees(this.employeeIdsToDelete)
					.then((res) => {
						// hiện thông báo thành công
						this.$emit(
							"onShowToast",
							defaultMessages.deleteSuccess,
							toastModes.success.backgroundColor,
							toastModes.success.icon
						);
						// reload trang
						this.$emit("onReloadPage", this.employeeKeyword);
						// close dialog
						this.showConfirmDialog = false;

						// reset employee id list
						this.employeeIdsToDelete = [];
					})
					.catch((error) => {
						// hiện thông báo lỗi
						this.$emit(
							"onShowToast",
							error.response.data.userMsg,
							toastModes.danger.backgroundColor,
							toastModes.danger.icon
						);
						// close dialog
						this.showConfirmDialog = false;
					});
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi nút "Thực hiện hàng loạt" được click
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleBtnDoManyClick() {
			try {
				// nếu không có checkbox nào được chọn
				if (this.employeeIdsToDelete.length <= 0) {
					return;
				}
				// có ít nhất 1 checkbox được chọn
				else {
					// lấy ra vị trí top, left của nút được click vào (tương đối với cửa sổ window của trình duyệt)
					const viewportOffset = this.$refs.btnDoMany.getBoundingClientRect();
					const offsetBottom = viewportOffset.bottom;
					const offsetRight = viewportOffset.right;

					const dropdown = this.$refs.dropdownDoMany;
					// set tab index để focus
					dropdown.setAttribute("tabindex", 0);
					// hiện dropdown
					Object.assign(dropdown.style, {
						display: "block",
						position: "fixed",
						top: offsetBottom + 1 + "px",
						left: offsetRight + "px",
						zIndex: 999999,
						transform: "translateX(-100%)",
					});

					// focus vào dropdown
					dropdown.focus();
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi  nút checkbox xoá ở từng thẻ tr được click vào
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleCheckboxDeleteClick($event, employeeId) {
			try {
				// lấy ra checkbox
				const target = $event.currentTarget || $event.target;
				// nếu checkbox được check, thêm employee id đó vào ds
				if (target.checked) {
					this.addSelectedEmployeeToDelete(target, employeeId);
				}
				// nếu checkbox được bỏ check, bỏ employee id đó từ ds
				else {
					this.removeSelectedEmployeeToDelete(target, employeeId);
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi  bấm ra ngoài dropdown xoá employee
		 * author: Trinh Quy Cong 10/7/22
		 */
		handleDropdownFunctionalityFocusOut() {
			try {
				this.closeDropdownFunctionality();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * close dropdown functionality
		 * author: Trinh Quy Cong 7/7/22
		 */
		closeDropdownFunctionality() {
			try {
				// ẩn dropdown
				this.$refs.dropdownFunctionality.style.display = "none";
				// bỏ tabindex
				this.$refs.dropdownFunctionality.removeAttribute("tabindex");
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		raisePageSizeChangeEvent(pageSize) {
			try {
				this.$emit("onPageSizeChange", pageSize, this.employeeKeyword);

				// reset list employee id to delete và style
				this.removeAllSelectedEmployeesToDelete();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		raisePageIndexChangeEvent(pageNumber) {
			try {
				this.$emit("onPageIndexChange", pageNumber, this.employeeKeyword);

				// reset list employee id to delete và style
				this.removeAllSelectedEmployeesToDelete();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * return date format dd/mm/yyyy
		 * author: Trinh Quy Cong 2/7/22
		 */
		showDropdownFunctionality($event) {
			try {
				// target chính là button được bấm vào (button có icon tam giác)
				const target = $event.currentTarget;

				// these are relative to the viewport, i.e. the window
				// lấy ra vị trí top, left của nút được click vào (tương đối với cửa sổ window của trình duyệt)
				const viewportOffset = target.getBoundingClientRect();
				const offsetTop = viewportOffset.top;
				const offsetLeft = viewportOffset.left;

				// dropdown chức năng
				const dropdownEl = this.$refs.dropdownFunctionality;

				// set tabindex để focus vào
				dropdownEl.setAttribute("tabindex", 0);
				// hiện dropdown với vị trí tương ứng con trỏ chuột sự kiện
				Object.assign(dropdownEl.style, {
					display: "block",
					left: offsetLeft - 60 + "px",
					top: offsetTop + 33 + "px",
				});

				// focus vào dropdown option
				this.$refs.dropdownFunctionality.focus();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * return date format dd/mm/yyyy
		 * author: Trinh Quy Cong 10/6/22
		 */
		formatDate(date) {
			try {
				date = new Date(date);
				let day = date.getDate();
				let month = date.getMonth() + 1;
				let year = date.getFullYear();

				day = day < 10 ? `0${day}` : day;
				month = month < 10 ? `0${month}` : month;

				return `${day}/${month}/${year}`;
			} catch (e) {
				console.log(e);
			}
		},
	},
};
</script>

<style scoped>
/* @import url(../../css/views/employee/employee-list.css); */
/* table area */
.m-table {
}

.m-table th,
td {
	padding: 6px 10px;
	text-align: left;
	background-color: #fff;
}

.m-table th {
	background-color: #e5e8ec;
	border-right: 1px solid #c7c7c7;
	border-bottom: 1px solid #c7c7c7;
	font-size: 12px;
	cursor: pointer;

	padding: 0;
	padding-left: 10px;
	padding-right: 10px;
	height: 34px;
	font-family: "misa-bold";
}

.m-table td {
	/* height: var(--grid-body-line-height); */
	height: 44px;
	padding: 0 10px;
	border-bottom: 1px solid #c7c7c7;
	border-right: 1px dotted #c7c7c7;
	white-space: pre-wrap;
}

.m-table td.emp-dob {
	text-align: center;
}

.m-table th.emp-id {
	min-width: 150px;
}

.m-table th.emp-name {
	min-width: 205px;
}

.m-table th.emp-role {
	min-width: 250px;
}

.m-table th.emp-organization-name {
	min-width: 250px;
}

.m-table th.emp-bank-name {
	min-width: 250px;
}

.m-table th.emp-dob {
	min-width: 139px;
	text-align: center;
}

.m-table th.emp-credit-card-number {
	min-width: 150px;
}

.m-table th.emp-gender {
	min-width: 120px;
}

.m-table th.emp-cmnd {
	min-width: 139px;
}

.m-table th.emp-bank-status {
	min-width: 176px;
}

.m-table th.emp-bank-branch {
	min-width: 250px;
}

.m-table tr:hover {
	background-color: #e9f3fc;
}

.m-table tr.active {
	background-color: #e5f3ff;
}

.m-table th.emp-action {
	min-width: 120px;
	position: sticky;
	right: 0;
	top: 0;
	z-index: 9;
	border-left: 1px solid #c7c7c7;
}

.m-table td.emp-action {
	position: sticky;
	right: 0;
	z-index: 1;
	background: #fff;
	border-left: 1px dotted #c7c7c7;
}

th.spacer,
td.spacer {
	width: 16px;
	background: #fff;
	border: none;
}

th.spacer.sticky,
td.spacer.sticky {
	position: sticky;
	top: 0;
	left: 0;
}

/* paging */
.m-paging-container {
	display: flex;
	justify-content: space-between;
	align-items: center;

	position: sticky;
	bottom: 0;
	left: 0;
	z-index: 9999;
	background: #fff;
}

.m-paging {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.m-paging .m-paging-dropdown {
	margin-right: 16px;
}

.m-paging .m-paging-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.m-paging .m-paging-bar li a {
	display: inline-block;
	height: 20px;
	line-height: 20px;
	cursor: pointer;
	padding: 0 7px;
}

.m-paging .m-paging-bar li:first-child {
	margin-right: 13px;
}

.m-paging .m-paging-bar li:last-child {
	margin-left: 13px;
}

.m-paging .m-paging-bar li:first-child a,
.m-paging .m-paging-bar li:last-child a {
	padding-left: 0;
	padding-right: 0;
}

.m-paging .m-paging-bar li.active a {
	font-weight: bold;
	border: 1px solid #e0e0e0;
}

.m-paging .m-paging-bar li.disabled a {
	cursor: default;
	color: #9e9e9e;
}

.m-paging .m-paging-bar li a {
	cursor: pointer;
	padding: 0 7px;
}

.m-paging .m-paging-bar li.current a {
	font-weight: bold;
	border: 1px solid #e0e0e0;
}

/* +, DROPDOWN OF TABLE */
.m-dropdown {
	font-size: 0;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
}

.m-dropdown .m-dropdown-button {
	appearance: none;
	border: none;
	background: transparent;
	font-weight: 600;
	cursor: pointer;
	color: var(--blue-color);
}

.m-dropdown .m-dropdown-button.m-dropdown-button-left {
	padding: 6px 0 6px 16px;
}

.m-dropdown .m-dropdown-button .m-small-wrapper {
	outline: 1px solid transparent;
	font-family: "misa-semibold";
	font-weight: 600;
}

.m-dropdown .m-dropdown-button.m-dropdown-button-right {
	padding: 8px 10px;
}

.m-dropdown .m-dropdown-button.m-dropdown-button-left .m-small-wrapper {
	line-height: 0.9rem;
	padding: 0 2px;
}
.m-dropdown .m-dropdown-button.m-dropdown-button-right .m-small-wrapper {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -896px -359px;
}

.m-dropdown .m-dropdown-button.m-dropdown-button-left:focus .m-small-wrapper,
.m-dropdown .m-dropdown-button.m-dropdown-button-right:focus .m-small-wrapper {
	outline-color: var(--blue-color);
}

/* hidden dropdown content */
.m-dropdown-content {
	min-width: 100px;
	z-index: 9999;
	position: fixed;
	display: none;
}
.m-dropdown-content ul {
	background: #fff;
	padding: 2px 1px;
	border-radius: 2px;
	border: 1px solid #babec5;
}

.m-dropdown-content ul li {
	cursor: pointer;
	transition: all 0.2s ease;
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
	display: block;
}

.m-dropdown-content ul li:hover {
	background: #ddd;
	color: var(--primary-color);
}

/* dropdown paging */
.m-select {
	position: relative;
}

.m-select.active,
.m-select:focus {
	border: 1px solid var(--primary-color);
}

.m-select-input {
}

.m-select-input:focus {
}

.m-select-button {
	display: flex;
	justify-content: center;
	align-items: center;
}

.m-select-button.active .m-select-button-icon {
	transform: rotate(180deg);
}

.m-select-button:hover,
.m-select-button:focus {
	background-color: #e0e0e0;
	border-color: #e0e0e0;
}

.m-select-button-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -560px -359px;

	width: 16px;
	height: 16px;
	min-width: 16px;
	min-height: 16px;
	transition: all 0.25s ease;
}

.m-select-list {
	position: absolute;
	left: 0;
	right: 0;
	bottom: calc(100% + 4px);
	background: #fff;
	border: 1px solid #babec5;

	visibility: hidden;
}

.m-select-list ul {
	margin: 0;
}

.m-select-list ul li {
	display: block;
	height: 32px;
	padding: 0 10px;
	cursor: pointer;
	line-height: 32px;
}

.m-select-list ul li:hover {
	background: #e0e0e0;
	color: var(--primary-color);
}

.m-select-list ul li.active {
	background: var(--primary-color);
	color: #fff;
}

.m-select-button.active ~ .m-select-list {
	visibility: visible;
	z-index: 9999;
}
/* ------------------------ NEW CSS ------------------------ */
.m-content {
	padding: 0 30px 0 20px;
	max-height: calc(100vh - var(--header-height));
}

.m-content section.m-top {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 24px 0 4px 0;
}

.m-content section.m-top .m-sub-header {
	font-family: misa-bold;
	font-size: 24px;
	font-weight: 700;
	color: #111;
}

.m-content section.m-body {
	scroll-behavior: smooth;
	position: relative;
	flex: 1;
	min-height: 0;
}

.m-content section.m-body .m-body-top {
	margin-top: 20px;
	padding: 16px 16px 16px 16px;
	background-color: #fff;

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.m-content section.m-body .m-body-top-right {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

/* search box */
.m-content section.m-body .m-body-top-right-search-wrapper {
	width: 240px;
	height: 32px;
	margin-right: 10px;

	position: relative;
}

.m-content section.m-body .m-body-top-right-search-wrapper input {
	width: 100%;
	height: 100%;
	border-radius: 2px;
	border: 1px solid #babec5;
	outline: none;
	padding: 0 36px 0 10px;
}

.m-content section.m-body .m-body-top-right-search-wrapper input:focus {
	border: 1px solid var(--primary-color);
}

.m-content section.m-body .m-body-top-right-search-wrapper input::placeholder {
	font-style: italic;
	font-size: 11px;
	color: rgb(0 0 0 / 40%);
}

.m-content section.m-body .m-body-top-right-search-wrapper button {
	background-color: transparent;
	outline: none;
	border: none;
	font-size: 1.06rem;

	position: absolute;
	right: 0;
	top: 0;

	width: 36px;
	height: 100%;
	padding: 0;
	color: rgb(0 0 0 / 40%);
	cursor: pointer;
}
/* end */

.m-content section.m-body .m-body-top-right-search-wrapper .m-button-search {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -986px -353px;
}

/* button utility (reload, excel) */
.m-button-utility-wrapper {
	padding: 0 6px;
}

.m-button-utility-wrapper button {
	background-color: transparent;
	outline: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;

	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
}

.m-button-reload {
	background-position: -423px -201px;
}

.m-button-reload:hover {
	background-position: -1097px -88px;
}

.m-button-excel {
	background-position: -704px -200px;
}

.m-button-excel:hover {
	background-position: -704px -256px;
}
/* end */

.m-content section.m-body .m-body-main {
	background-color: #fff;
	display: flex;
	padding-right: 30px;
	/* overflow: auto; */
}

.m-content section.m-body .m-body-main-wrapper-level-1 {
	min-width: 100%;

	/* overflow: auto; */
}

.m-content section.m-body .m-body-main-wrapper-level-2 {
	max-height: none;
	min-width: 100%;

	overflow: auto;
	max-height: calc(100vh - 279px);
}

.m-content section.m-body table {
	border-spacing: 0;
	min-width: 100%;
}

.m-content section.m-body table thead {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 9;
}

.m-content section.m-body table tbody tr:hover td:not(.spacer) {
	background: #f2f9ff;
}

.m-content section.m-body table tbody tr:focus td:not(.spacer) {
	background: #e5f3ff;
}
/* new */
.m-content section.m-body table tbody tr.selected td:not(.spacer) {
	background: #e5f3ff;
}

.m-content section.m-body .m-paging-container {
	position: -webkit-sticky;
	position: sticky;
	bottom: 0;
	left: 0;
	z-index: 1;
	background-color: #fff;
	display: flex;

	padding: 12px;
}

/* Designing for scroll-bar */
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #b8bcc3;
	transition: all 0.35s ease;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #999;
}

/* no result found image */
.no-result-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.no-result-wrapper img {
	margin: 50px 50px 30px;
}

/* NEW CSS FOR EXCEL EXPORT AND BUTTON DO MANY  */
.m-body-top-left .m-button-do-many {
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 0 16px;
	height: 36px;
}

.m-body-top-left .m-button-do-many > * {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.m-body-top-left .m-button-do-many > * > .text {
	margin-right: 4px;
}

.m-body-top-left .m-button-do-many > * > .icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -560px -359px;
	opacity: 0.5;
}
</style>
