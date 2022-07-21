<template>
	<div>
		<!-- Toast message -->
		<ToastNotifier v-if="showToast" :text="toastText" :background="toastBackground" :icon="toastIcon" @onCloseToast="showToast = false" />
		<!-- end Toast message -->

		<!-- employee list -->
		<EmployeeList
			:employees="employees"
			:pageSize="pageSize"
			:totalRecords="totalRecords"
			@onOpenMainDialog="handleOpenMainDialog"
			@onSelectedEmployeeChange="handleUpdateSelectedEmployee"
			@onFormModeAdd="handleUpdateFormModeAdd"
			@onFormModeUpdate="handleUpdateFormModeUpdate"
			@onReloadPage="getEmployees"
			@onSearchEmployees="searchEmployees"
			@onShowConfirmDeleteDialog="showConfirmDeleteDialog = true"
			@onShowToast="handleShowToast"
			@onPageIndexChange="handlePageIndexChange"
			@onPageSizeChange="handlePageSizeChange"
			@onDuplicateRecord="handleDuplicateRecord"
		/>
		<!-- end employee list -->

		<!-- main dialog -->
		<EmployeeDetail
			:employeeProp="selectedEmployee"
			:formModeProp="formMode"
			v-if="showMainDialog"
			@onCloseMainDialog="handleCloseMainDialog"
			@onShowMainDialog="handleOpenMainDialog"
			@onReloadEmployeeList="getEmployees"
			@onShowToast="handleShowToast"
		/>
		<!-- end main dialog -->

		<!-- loader animation -->
		<PageLoader v-show="showLoader" />
		<!-- end loader animation -->

		<!-- confirm delete dialog -->
		<InfoDialog
			id="confirmDeleteDialog"
			v-show="showConfirmDeleteDialog"
			showBody
			closeButtonText="Không"
			showConfirmButton
			confirmButtonText="Có"
			:body="`Bạn có chắc muốn xoá nhân viên có mã ${selectedEmployee ? selectedEmployee.EmployeeCode : ''}?`"
			@onCloseInfoDialog="showConfirmDeleteDialog = false"
			@onConfirm="handleDeleteEmployee"
			:cssIcon="cssInfoDialog.warning"
		/>
		<!-- end confirm delete dialog -->
	</div>
</template>

<script>
import Employee from "../../models/Employee.model.js";
import { FormModeEnum, genders, pagingConfig } from "../../utils.js";
import EmployeeList from "./EmployeeList.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import InfoDialog, { cssInfoDialog } from "../../components/base/InfoDialog.vue";
import ToastNotifier, { toastModes } from "../../components/base/ToastNotifier.vue";
import PageLoader from "../../components/base/PageLoader.vue";

// dùng để gọi API
import ServiceFactory from "../../services/ServiceFactory.js";
const EmployeeService = ServiceFactory.get("employees");

export default {
	components: { EmployeeList, EmployeeDetail, PageLoader, InfoDialog, ToastNotifier },

	data() {
		return {
			// hiện toast
			showToast: false,

			// text của toast
			toastText: toastModes.success.message,

			// background của toast
			toastBackground: toastModes.success.backgroundColor,

			// cấu hình toast icon
			toastIcon: toastModes.success.icon,

			// danh sách nhân viên
			employees: [],

			// chế độ của form (add/update)
			formMode: null,

			// employee để truyền sang component con dưới dạng prop
			selectedEmployee: null,

			// hiển thị main dialog
			showMainDialog: false,

			// hiển thị dialog thông báo lỗi
			showErrorMessageDialog: false,

			// hiển thi dialog xác nhận xoá
			showConfirmDeleteDialog: false,

			// hiển thị loader
			showLoader: false,

			// timeout để tìm kiếm employee (được dùng trong hàm search employees)
			timeOutSearchEmployee: 0,

			// số bản ghi trên 1 trang
			pageSize: pagingConfig.pageSize,

			// trang hiện tại (tính từ 0)
			pageIndex: 0,

			// tổng số bản ghi
			totalRecords: 0,

			// css cho các info dialog (dialog lỗi, dialog xác nhận xoá)
			cssInfoDialog: cssInfoDialog,
		};
	},

	created() {
		// lấy danh sách nhân viên ngay sau khi khởi tạo component
		this.getEmployees();
	},

	methods: {
		/**
		 * hàm xử lý ngay sau khi người dùng kích nút "nhân bản" trên 1 bản ghi nào đó
		 * author: Trinh Quy Cong 14/7/22
		 */
		handleDuplicateRecord() {
			try {
				// lấy mã employee code mới
				EmployeeService.getNewEmployeeCode()
					.then((res) => {
						// set new employee code cho data selected employee
						this.selectedEmployee.EmployeeCode = res.data;
						// set form mode
						this.formMode = FormModeEnum.add;
						// hiện main dialog
						this.showMainDialog = true;
					})
					.catch((res) => {
						// hiển thị toast lỗi
						this.handleShowToast(res.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
					});
			} catch (e) {
				// hiển thị toast lỗi
				this.handleShowToast("Có lỗi xảy ra...", toastModes.danger.backgroundColor, toastModes.danger.icon);
			}
		},

		/**
		 * hàm xử lý khi page size thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		handlePageSizeChange(pageSize, keyword) {
			// cập nhật data page size
			this.pageSize = pageSize;
			// cập nhật ds nhân viên
			this.getEmployees(keyword);
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		handlePageIndexChange(pageNumber, keyword) {
			// vì api quy định lấy theo pageIndex
			// cập nhật data page index
			this.pageIndex = pageNumber - 1;
			// cập nhật ds nhân viên
			this.getEmployees(keyword);
		},

		/**
		 * hiển thị toast
		 * author: Trinh Quy Cong 7/7/22
		 */
		handleShowToast(text, backgroundColor, icon) {
			// hiện toast kèm theo cấu hình
			this.showToast = true;
			this.toastText = text;
			this.toastBackground = backgroundColor;
			this.toastIcon = icon;
		},

		/**
		 * xoá nhân viên
		 * author: Trinh Quy Cong 2/7/22
		 */
		handleDeleteEmployee() {
			try {
				// gọi API xoá
				EmployeeService.deleteEmployee(this.selectedEmployee.EmployeeId)
					.then((res) => {
						// nếu xoá thành công
						if (res.data == 1) {
							// hiển thị toast thành công
							this.handleShowToast("Xoá nhân viên thành công", toastModes.success.backgroundColor, toastModes.success.icon);
						}

						// load lại trang
						this.getEmployees();

						// ẩn dialog xác nhận xoá
						this.showConfirmDeleteDialog = false;
					})
					.catch((error) => {
						// hiển thị toast thất bại
						this.handleShowToast(error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
						// ẩn dialog xác nhận xoá
						this.showConfirmDeleteDialog = false;
					});
			} catch (error) {
				this.handleShowToast("Có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
			}
		},
		/**
		 * chuyển form mode thành update
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleUpdateFormModeUpdate() {
			try {
				this.formMode = FormModeEnum.update;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * chuyển form mode thành thêm mới
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleUpdateFormModeAdd() {
			try {
				//chuyển form mode
				this.formMode = FormModeEnum.add;

				// lấy ra mã employee code mới
				EmployeeService.getNewEmployeeCode()
					.then((res) => {
						const employeeCode = res.data;

						// khởi tạo đối tượng employee và set các giá trị ban đầu
						let employee = new Employee();
						employee.EmployeeCode = employeeCode;
						employee.Gender = genders.male.value;

						// gán cho data selectedEmployee
						this.selectedEmployee = employee;

						// sau khi set xong employee mới show dialog lên
						this.showMainDialog = true;
					})
					.catch((error) => {
						// hiện toast báo lỗi
						this.handleShowToast(error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
					});
			} catch (error) {
				this.handleShowToast("Có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
			}
		},

		/**
		 * hiện main dialog
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleOpenMainDialog() {
			try {
				this.showMainDialog = true;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * ẩn main dialog
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleCloseMainDialog() {
			try {
				this.showMainDialog = false;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * cập nhật selected employee
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleUpdateSelectedEmployee(newEmployee, mode) {
			try {
				// mode là sửa, lấy employee từ API để đảm bảo thông tin employee là mới nhất
				if (mode === FormModeEnum.update) {
					EmployeeService.getById(newEmployee.EmployeeId)
						.then((res) => {
							const employee = res.data;

							// 1967-11-16T00:00:00
							// chuyển đổi date để có thể hiển thị trên dialog
							if (employee.DateOfBirth) {
								employee.DateOfBirth = employee.DateOfBirth.substring(0, 10);
							}
							if (employee.IdentityDate) {
								employee.IdentityDate = employee.IdentityDate.substring(0, 10);
							}

							// gán employee
							this.selectedEmployee = employee;

							// hiện main dialog
							this.showMainDialog = true;
						})
						.catch((error) => {
							// hiện toast báo lỗi
							this.handleShowToast(error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
						});
				}

				// mode là xoá, chỉ cần lấy employee được truyền vào từ hàm để lấy employee id (không gọi api)
				else if (mode === FormModeEnum.delete) {
					// convert date để hiển thị trên main dialog
					if (newEmployee.DateOfBirth) {
						newEmployee.DateOfBirth = newEmployee.DateOfBirth.substring(0, 10);
					}
					if (newEmployee.IdentityDate) {
						newEmployee.IdentityDate = newEmployee.IdentityDate.substring(0, 10);
					}

					// gán employee
					this.selectedEmployee = newEmployee;
				}
			} catch (e) {
				// hiện toast báo lỗi
				this.handleShowToast("Đã có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
			}
		},

		/**
		 * lấy danh sách nhân viên từ API kèm phân trang
		 * set keyword mặc định bằng chuỗi rỗng; set page index mặc định từ data page index nếu không được truyền vào
		 * author: Trinh Quy Cong 30/6/22
		 */
		getEmployees(keyword = "", pageIndex=this.pageIndex) {
			try {
				// hiện loader
				this.showLoader = true;

				// call api
				EmployeeService.getPaging(pageIndex, this.pageSize, keyword)
					.then((res) => {
						const { Data, TotalRecords } = res.data;
						// set employee list
						this.employees = Data;
						// set total records
						this.totalRecords = TotalRecords;
						// ẩn loader
						this.showLoader = false;
					})
					.catch((res) => {
						// hiện toast báo lỗi
						if (res.response.data){
							this.handleShowToast(res.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);

						} else {
							this.handleShowToast("Có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
						}

						// ẩn loader
						this.showLoader = false;
					});
			} catch (e) {
				// hiện toast báo lỗi
				this.handleShowToast("Đã có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
				// ẩn loader
				this.showLoader = false;
			}
		},

		/**
		 * tìm kiếm nhân viên
		 * author: Trinh Quy Cong 1/7/22
		 */
		searchEmployees(keyword) {
			try {
				const me = this;

				// clear time out
				clearTimeout(me.timeOutSearchEmployee);

				// thực hiện tìm kiếm sau mỗi 500 mili giây
				this.timeOutSearchEmployee = setTimeout(() => {
					// truyền page index để luôn lấy trang đầu
					me.getEmployees(keyword, 0);
				}, 500);
			} catch (error) {
				// hiện toast báo lỗi
				this.handleShowToast("Có lỗi xảy ra", toastModes.danger.backgroundColor, toastModes.danger.icon);
			}
		},
	},
};
</script>

<style scoped>
@import url(../../css/views/employee/employee-page.css);
</style>
