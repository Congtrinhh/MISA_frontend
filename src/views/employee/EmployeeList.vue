<template>
	<div>
		<div ref="employeeListContent" class="m-content">
			<!-- section 1 - right below header (phần ngay dưới header) -->
			<section class="m-top">
				<div class="m-sub-header">Nhân viên</div>
				<div class="m-top-btns">
					<button class="m-button m-button-secondary" id="btnImportExcel">Nhập từ Excel</button>
					<button @click="$emit('onFormModeAdd')" class="m-button" id="btnNewEmployee">Thêm mới nhân viên</button>
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

						<div class="m-body-top-right-reload m-button-utility-wrapper">
							<button class="m-button-reload mi-24" id="btnReload" @click="$emit('onReloadPage', employeeKeyword)"></button>
						</div>

						<div class="m-body-top-right-excel m-button-utility-wrapper">
							<button class="m-button-excel mi-24" id="btnExcel"></button>
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
									<th class="emp-cmnd">Số CMND</th>
									<th class="emp-role">CHỨC DANH</th>
									<th class="emp-organization-name">TÊN ĐƠN VỊ</th>
									<th class="emp-credit-card-number">SỐ TÀI KHOẢN</th>
									<th class="emp-bank-name">TÊN NGÂN HÀNG</th>
									<th class="emp-bank-status">TRẠNG THÁI</th>
									<th class="emp-bank-branch">CHI NHÁNH</th>
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
											<td>{{ emp.WorkStatus ? emp.WorkStatus : "-" }}</td>
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
							<img src="https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg" alt="no result found" />
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
				showBody
				closeButtonText="Không"
				showConfirmButton
				confirmButtonText="Có"
				:body="confirmDialogConfig.body"
				@onCloseInfoDialog="showConfirmDialog = false"
				@onConfirm="handleDeleteManyEmployees"
				:cssIcon="confirmDialogConfig.cssIcon"
			/>
			<!-- end confirm dialog -->
		</div>
	</div>
</template>

<script>
import { FormModeEnum } from "../../utils.js";
import InfoDialog, { cssInfoDialog } from "../../components/base/InfoDialog.vue";
import { toastModes } from "../../components/base/ToastNotifier.vue";

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
			confirmDialogConfig: {},
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
		 * HÀM CON xử lý khi bỏ chọn checkbox chọn tất cả
		 * author: Trinh Quy Cong 20/7/22
		 */
		removeAllSelectedEmployeesToDelete() {
			// bỏ chọn checkbox chọn tất cả
			this.$refs.checkBoxAllRows.checked = false;
			// bỏ chọn tất cả checkbox item và background
			this.$refs.mainTable.querySelectorAll("tbody tr input[type='checkbox'].checkbox-item").forEach((input) => {
				input.checked = false;
				input.closest("tr").classList.remove("selected");
			});
			// xoá hết employee id trong mảng chứa
			this.employeeIdsToDelete = [];
		},

		/**
		 * HÀM CON xử lý khi tích chọn checkbox chọn tất cả
		 * author: Trinh Quy Cong 20/7/22
		 */
		addAllSelectedEmployeesToDelete() {
			// tích chọn checkbox chọn tất cả
			this.$refs.checkBoxAllRows.checked = true;
			// chọn tất cả các checkbox item và background
			this.$refs.mainTable.querySelectorAll("tbody tr input[type='checkbox'].checkbox-item").forEach((input) => {
				input.checked = true;
				input.closest("tr").classList.add("selected");
			});

			// thêm tất cả employee id của từng checkbox item vào mảng chứa
			this.employeeIdsToDelete = [];
			this.employees.forEach((employee) => {
				this.employeeIdsToDelete.push(employee.EmployeeId);
			});
		},

		/**
		 * HÀM CON xử lý khi bỏ chọn input checkbox của 1 bản ghi
		 * author: Trinh Quy Cong 20/7/22
		 */
		removeSelectedEmployeeToDelete(inputElement, employeeId) {
			this.employeeIdsToDelete = this.employeeIdsToDelete.filter((id) => id !== employeeId);
			inputElement.closest("tr").classList.remove("selected");
		},

		/**
		 * HÀM CON xử lý khi tích chọn input checkbox của 1 bản ghi
		 * author: Trinh Quy Cong 20/7/22
		 */
		addSelectedEmployeeToDelete(inputElement, employeeId) {
			this.employeeIdsToDelete.push(employeeId);
			inputElement.closest("tr").classList.add("selected");
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
			// nếu input vừa được chọn
			if (target.checked) {
				this.addAllSelectedEmployeesToDelete();
			} else {
				this.removeAllSelectedEmployeesToDelete();
			}
		},

		/**
		 * hiện dialog xác nhận (dialog thông báo) cùng với set up
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleShowConfirmDialog() {
			this.confirmDialogConfig.body = `Bạn có chắc muốn xoá ${this.employeeIdsToDelete.length} bản ghi đã chọn?`;
			this.confirmDialogConfig.cssIcon = cssInfoDialog.warning;

			this.showConfirmDialog = true;
		},

		/**
		 * thực hiện xoá nhiều employees
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleDeleteManyEmployees() {
			EmployeeService.deleteEmployees(this.employeeIdsToDelete)
				.then((res) => {
					// hiện thông báo thành công
					this.$emit("onShowToast", "Đã xoá thành công", toastModes.success.backgroundColor, toastModes.success.icon);
					// reload trang
					this.$emit("onReloadPage", this.employeeKeyword);
					// close dialog
					this.showConfirmDialog = false;

					// reset employee id list
					this.employeeIdsToDelete = [];
				})
				.catch((error) => {
					// hiện thông báo lỗi
					this.$emit("onShowToast", error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
					// close dialog
					this.showConfirmDialog = false;
				});
		},

		/**
		 * hàm xử lý khi nút "Thực hiện hàng loạt" được click
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleBtnDoManyClick() {
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
		},

		/**
		 * hàm xử lý khi  nút checkbox xoá ở từng thẻ tr được click vào
		 * author: Trinh Quy Cong 19/7/22
		 */
		handleCheckboxDeleteClick($event, employeeId) {
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
@import url(../../css/views/employee/employee-list.css);
</style>
