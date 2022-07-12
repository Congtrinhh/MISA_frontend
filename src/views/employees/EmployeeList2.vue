<template>
	<div>
		<div ref="employeeListContent" class="m-content">
			<section class="m-top">
				<div class="m-sub-header">Nhân viên</div>
				<div class="m-top-btns">
					<button @click="$emit('onFormModeAdd')" class="m-button" id="btnNewEmployee">
						Thêm mới nhân viên
					</button>
				</div>
			</section>

			<section class="m-body">
				<!-- body top (right below table content) -->
				<div class="m-body-top m-body-controls">
					<!-- body left (nothing now, add elements later) -->
					<div class="m-body-top-left"></div>

					<!-- search box and reload button -->
					<div class="m-body-top-right">
						<div class="m-body-top-right-search-wrapper">
							<input
								type="text"
								name="employee-keyword"
								v-model="employeeKeyword"
								@input="$emit('onSearchEmployees', employeeKeyword)"
								placeholder="Tìm theo mã, tên nhân viên"
							/>
							<button class="m-button-search mi-16"></button>
						</div>
						<div class="m-body-top-right-reload">
							<button
								class="m-button-reload mi-24"
								id="btnReload"
								@click="$emit('onReloadPage', employeeKeyword)"
							></button>
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
									<th><input type="checkbox" name="check-all-rows" id="checkBoxAllRows" /></th>
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
										:key="emp.EmployeeCode"
										@dblclick="
											$emit('onOpenMainDialog');
											$emit('onFormModeUpdate');
											$emit('onSelectedEmployeeChange', emp);
										"
									>
										<template>
											<td class="spacer"></td>
											<td><input type="checkbox" name="check-row" id="" /></td>
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
															$emit('onOpenMainDialog');
															$emit('onFormModeUpdate');
															$emit('onSelectedEmployeeChange', emp);
														"
														class="m-dropdown-button-modify m-dropdown-button m-dropdown-button-left"
													>
														<div class="m-small-wrapper">Sửa</div>
													</button>
													<button
														class="m-dropdown-button m-dropdown-button-right"
														@click="
															$emit('onSelectedEmployeeChange', emp);
															showDropdown($event);
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
						<!-- pagination -->
						<div class="m-paging-container">
							<div class="m-paging-total-records">
								Tổng số: <b>{{ totalRecords }}</b> bản ghi
							</div>
							<div class="m-paging">
								<el-pagination
									@size-change="raisePageSizeChangeEvent"
									@current-change="raisePageIndexChangeEvent"
									:page-sizes="[10, 20, 30, 50, 100]"
									:page-size="pageSize"
									:pager-count="5"
									layout="sizes, prev, pager, next"
									:total="totalRecords"
									prev-text="Trước"
									next-text="Sau"
								>
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- dropdown of delete function -->
			<div
				ref="dropdownFunctionality"
				@click="closeDropdownFunctionality"
				class="m-dropdown-content m-dropdown-content-delete"
				@focus="handleDropdownOptionFocus"
				@focusout="handleDropdownOptionFocusOut"
				tabindex="0"
			>
				<ul>
					<li class="delete" @click="$emit('onShowConfirmDeleteDialog')">Xoá</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
// import { pagingConfig, apiUrls } from "../../utils.js";
export default {
	components: {},

	data() {
		return {
			employeeKeyword: "",
		};
	},

	props: {
		employees: { type: Array },
		pageSize: { type: Number },
		totalRecords: { type: Number },
		currentPageIndex: { type: Number },
	},

	/**
	 * When component is mounted to dom
	 * Author: Trinh Quy Cong 10/7/22
	 */
	mounted() {
		// debugger
		//get height of the content section
		// const tableHeight = this.$refs.mainTable.clientHeight;
		// if (tableHeight > (window.innerHeight-48)) {
		// 	this.$refs.employeeListContent .querySelector('.m-paging-container').classList.add('fixed');
		// }
	},

	methods: {
		/**
		 * hàm xử lý khi  bấm vào dropdown xoá employee
		 * author: Trinh Quy Cong 10/7/22
		 */
		handleDropdownOptionFocus() {},

		/**
		 * hàm xử lý khi  bấm ra ngoài dropdown xoá employee
		 * author: Trinh Quy Cong 10/7/22
		 */
		handleDropdownOptionFocusOut() {
			console.log("dropdown focus out");
			// ẩn dropdown option khi bấm ra ngoài dropdown option
			this.$refs.dropdownFunctionality.style.display = "none";
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		raisePageSizeChangeEvent(pageSize) {
			this.$emit("onPageSizeChange", pageSize, this.employeeKeyword);
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		raisePageIndexChangeEvent(pageNumber) {
			this.$emit("onPageIndexChange", pageNumber, this.employeeKeyword);
		},

		/**
		 * close dropdown functionality
		 * author: Trinh Quy Cong 7/7/22
		 */
		closeDropdownFunctionality() {
			this.$refs.dropdownFunctionality.style.display = "none";
		},
		/**
		 * return date format dd/mm/yyyy
		 * author: Trinh Quy Cong 2/7/22
		 */
		showDropdown($event) {
			const dropdownEl = this.$refs.dropdownFunctionality;

			const posX = $event.clientX;
			const posY = $event.clientY;

			dropdownEl.style.display = "block";
			dropdownEl.style.left = posX - 80 + "px";
			dropdownEl.style.top = posY + 10 + "px";

			// focus vào dropdown option
			this.$refs.dropdownFunctionality.focus();
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
@import url(../../css/views/employee/employee-list-2.css);
</style>
