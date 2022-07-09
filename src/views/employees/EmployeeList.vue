<template>
	<div>
		<div class="m-content">
			<div class="m-top">
				<div class="m-sub-header">Nhân viên</div>
				<div class="m-top-btns">
					<div class="m-dropdown">
						<button @click="$emit('onFormModeAdd')" class="m-button" id="btnNewEmployee">
							Thêm mới nhân viên
						</button>
					</div>
				</div>
			</div>

			<div class="m-breadcrumb" style="display: none">
				<i class="fa-solid fa-angle-left"></i>
				Tất cả danh mục
			</div>

			<div class="m-table-header">
				<div class="m-table-header-left">
					<div class="m-dropdown"></div>
				</div>
				<div class="m-table-header-right">
					<div class="m-table-header-right-search-wrapper">
						<input
							type="text"
							name="employee-keyword"
							v-model="employeeKeyword"
							@input="$emit('onSearchEmployees', employeeKeyword)"
							placeholder="Tìm theo mã, tên nhân viên"
						/>
						<button class="m-button-search mi-16"></button>
					</div>
					<div class="m-table-header-right-reload">
						<button class="m-button-reload mi-24" id="btnReload" @click="$emit('onReloadPage')"></button>
					</div>
					<div class="m-table-header-right-excel"></div>
					<div class="m-table-header-right-setting"></div>
				</div>
			</div>
			<div class="m-table-wrapper">
				<div class="m-table-content">
					<table id="mainTable" class="m-table">
						<thead>
							<th><input type="checkbox" name="check-all-rows" id="" /></th>
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
									<td><input type="checkbox" name="check-row" id="" /></td>
									<td class="emp-id">{{ emp.EmployeeCode }}</td>
									<td>{{ emp.EmployeeName ? emp.EmployeeName : "-" }}</td>
									<td>{{ emp.GenderName ? emp.GenderName : "-" }}</td>
									<td class="emp-dob">{{ formatDate(emp.DateOfBirth) }}</td>
									<td>{{ emp.IdentityNumber ? emp.IdentityNumber : "-" }}</td>
									<td>{{ emp.EmployeePosition ? emp.EmployeePosition : "-" }}</td>
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

				<div class="m-paging-container">
					<div class="m-paging-total-records">
						Tổng số: <b>{{ employees.length }}</b> bản ghi
					</div>
					<div class="m-paging">
						<div class="m-select m-paging-select">
							<input type="text" class="m-select-input" />
							<button class="m-select-button">
								<div class="m-select-button-icon"></div>
							</button>

							<div class="m-select-list">
								<ul>
									<li>what...</li>
									<li>what...</li>
									<li>what...</li>
								</ul>
							</div>
						</div>
						<ul class="m-paging-bar">
							<li><a href="#" class="m-paging-btn disabled">Trước</a></li>
							<li><a href="#" class="m-paging-btn current">1</a></li>
							<li><a href="#" class="m-paging-btn">2</a></li>
							<li><a href="#" class="m-paging-btn">3</a></li>
							<li><a href="#" class="m-paging-btn">4</a></li>
							<li><a href="#" class="m-paging-btn">Sau</a></li>
						</ul>
					</div>
				</div>
			</div>

			<!-- dropdown of delete function -->
			<div
				ref="dropdownFunctionality"
				@click="closeDropdownFunctionality"
				class="m-dropdown-content m-dropdown-content-delete"
			>
				<ul>
					<li class="delete" @click="$emit('onShowConfirmDeleteDialog')">Xoá</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	components: {},

	data() {
		return {
			employeeKeyword: "",
		};
	},

	props: {
		employees: { type: Array },
	},

	methods: {
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

			// chua xong, tiep tuc o day...
		},

		/**
		 * return date format dd/mm/yyyy
		 * author: Trinh Quy Cong 10/6/22
		 */
		formatDate(date) {
			try {
				date = new Date(date);
				let day = date.getDay();
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
