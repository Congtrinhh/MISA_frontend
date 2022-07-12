<template>
	<div>
		<ToastNotifier
			v-if="showToast"
			:text="toastText"
			:background="toastBackground"
			:icon="toastIcon"
			@onCloseToast="showToast = false"
		/>

		<EmployeeList2
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
		/>

		<!-- main dialog -->
		<EmployeeDetail
			:employeeProp="selectedEmployee"
			:formModeProp="formMode"
			v-if="showMainDialog"
			@onCloseMainDialog="handleCloseMainDialog"
			@onShowMainDialog="handleOpenMainDialog"
			@onReloadEmployeeList="handleReloadEmployeeList"
			@onShowToast="handleShowToast"
		/>

		<PageLoader v-show="showLoader" />

		<!-- confirm delete dialog -->
		<InfoDialog
			id="confirmDeleteDialog"
			v-show="showConfirmDeleteDialog"
			showBody
			closeButtonText="Không"
			confirmButtonText="Có"
			:body="`Bạn có chắc muốn xoá nhân viên có mã ${selectedEmployee ? selectedEmployee.EmployeeCode : ''}?`"
			@onCloseInfoDialog="showConfirmDeleteDialog = false"
			@onConfirm="handleDeleteEmployee"
			showConfirmButton
		/>
	</div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import Employee from "../../models/Employee.model.js";
import { apiUrls, FormModeEnum, genders, pagingConfig } from "../../utils.js";
import EmployeeList2 from "./EmployeeList2.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import InfoDialog from "../../components/base/InfoDialog.vue";
import ToastNotifier, { toastModes } from "../../components/base/ToastNotifier.vue";
import PageLoader from "../../components/base/PageLoader.vue";

export default {
	components: { EmployeeList2, EmployeeDetail, PageLoader, InfoDialog, ToastNotifier },

	data() {
		return {
			// show toast message or not
			showToast: false,
			// text inside toast
			toastText: toastModes.success.message,
			// background of toast
			toastBackground: toastModes.success.backgroundColor,
			// toast icon
			toastIcon: toastModes.success.icon,

			// list of employees
			employees: [],
			// mode of form (add/update)
			formMode: null,
			// the employee to pass in to child as prop
			selectedEmployee: null,
			//
			showMainDialog: false,
			showErrorMessageDialog: false,
			showConfirmDeleteDialog: false,
			showLoader: false,

			// search employee time out
			timeOutSearchEmployee: 0,

			// page size cho phân trang trong employee list
			pageSize: pagingConfig.pageSize,

			// tổng số bản ghi employee trong database
			totalRecords: 0,
		};
	},

	watch: {
		selectedEmployee(oldValue, newValue) {
			console.log(oldValue, newValue);
		},
	},

	props: {},

	/**
	 * get employee list as soon as the component is created
	 * author: Trinh Quy Cong 28/6/22
	 */
	created() {
		this.getEmployees();
	},

	/**
	 *
	 * author: Trinh Quy Cong 28/6/22
	 */
	mounted() {},

	/**
	 * when component updated
	 * author: Trinh Quy Cong 28/6/22
	 */
	updated() {
		console.log("employeePage updated");
	},

	methods: {
		/**
		 * hàm xử lý khi page size thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		handlePageSizeChange(pageSize, keyword) {
			this.pageSize = pageSize;
			this.$http
				.get(`${apiUrls.employee}?size=${pageSize}&size=${this.pageSize}&keyword=${keyword}`)
				.then((res) => {
					console.log(res.data);
					this.employees = res.data.Data;
				})
				.catch((e) => {
					console.log(e);
				});
		},

		/**
		 * hàm xử lý khi page index thay đổi
		 * author: Trinh Quy Cong 10/7/22
		 */
		handlePageIndexChange(pageNumber, keyword) {
			// vì api quy định lấy theo pageIndex
			let pageIndex = pageNumber - 1;
			this.$http
				.get(`${apiUrls.employee}?pageIndex=${pageIndex}&size=${this.pageSize}&keyword=${keyword}`)
				.then((res) => {
					console.log(res.data);
					this.employees = res.data.Data;
				})
				.catch((e) => {
					console.log(e);
				});
		},

		/**
		 * show toast
		 * author: Trinh Quy Cong 7/7/22
		 */
		handleShowToast(text, backgroundColor, icon) {
			this.showToast = true;
			this.toastText = text;
			this.toastBackground = backgroundColor;
			this.toastIcon = icon;
		},

		/**
		 * delete employee
		 * author: Trinh Quy Cong 2/7/22
		 */
		handleDeleteEmployee() {
			try {
				// call API delete
				this.$http
					.delete(`${apiUrls.employee}/${this.selectedEmployee.EmployeeId}`)
					.then((res) => {
						// thong bao xoa thanh cong
						if (res.data == 1) {
							console.log("xoa thanh cong");
							this.handleShowToast(
								"Xoá nhân viên thành công",
								toastModes.success.backgroundColor,
								toastModes.success.icon
							);
						}
						// fetch employees
						this.getEmployees();
						// an confirm delete InfoDialog
						this.showConfirmDeleteDialog = false;
					})
					.catch((error) => {
						this.handleShowToast(
							error.response.data.userMsg,
							toastModes.danger.backgroundColor,
							toastModes.danger.icon
						);
					});
			} catch (error) {
				this.handleShowToast(
					error.response.data.userMsg,
					toastModes.danger.backgroundColor,
					toastModes.danger.icon
				);
			}
		},
		/**
		 * change form mode to update
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleUpdateFormModeUpdate() {
			this.formMode = FormModeEnum.update;
		},

		/**
		 * change form mode to add
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleUpdateFormModeAdd() {
			try {
				this.formMode = FormModeEnum.add;

				// get new employee code
				this.$http
					.get(`${apiUrls.employee}/newEmployeeCode`)
					.then((data) => {
						
						const employeeCode = data.data;
						let employee = new Employee();
						employee.EmployeeCode = employeeCode;
						employee.Gender = genders.male.value;

						this.selectedEmployee = employee;
						// sau khi set xong employee mới show dialog lên
						this.showMainDialog = true;
					})
					.catch((error) => {
						this.handleShowToast(
							error.response.data.userMsg,
							toastModes.danger.backgroundColor,
							toastModes.danger.icon
						);
					});
			} catch (error) {
				this.handleShowToast(
					error.response.data.userMsg,
					toastModes.danger.backgroundColor,
					toastModes.danger.icon
				);
			}
		},

		/**
		 * open main dialog
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleOpenMainDialog() {
			this.showMainDialog = true;
		},

		/**
		 * close main dialog
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleCloseMainDialog() {
			this.showMainDialog = false;
		},

		/**
		 * update selected employee
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleUpdateSelectedEmployee(newEmployee) {
			try {
				// 1967-11-16T00:00:00
				// chuyển đổi date để có thể hiển thị trên dialog
				if (newEmployee.DateOfBirth) {
					newEmployee.DateOfBirth = newEmployee.DateOfBirth.substring(0, 10);
				}
				if (newEmployee.IdentityDate) {
					newEmployee.IdentityDate = newEmployee.IdentityDate.substring(0, 10);
				}

				this.selectedEmployee = newEmployee;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * convert date from api entity (format yyyy/mm/ddd) into vn date format (dd/mm/yyyy)
		 * author: Trinh Quy Cong 28/6/22
		 */
		convertDateIntoVNFormat(rawDate) {
			// raw date format: 1967-11-16T00:00:00
			let date, month, year;
			let dateObject = new Date(rawDate);
			date = dateObject.getDate() < 10 ? `0${dateObject.getDate()}` : dateObject.getDate();
			month = dateObject.getMonth() + 1 < 10 ? `0${dateObject.getMonth() + 1}` : dateObject.getMonth() + 1;
			year = dateObject.getFullYear();
			return `${date}-${month}-${year}`;
		},

		/**
		 * update selected employee
		 * author: Trinh Quy Cong 28/6/22
		 */
		handleReloadEmployeeList() {
			// hide main dialog
			// this.showMainDialog = false;
			// get list employee
			this.getEmployees();
		},

		/**
		 * get employee list from api with paging
		 * author: Trinh Quy Cong 30/6/22
		 */
		async getEmployees(keyword='') {
			try {
				this.showLoader = true;
				this.$http
					.get(`${apiUrls.employee}?keyword=${keyword}`)
					.then((response) => {
						const data = response.data;
						// set employee list
						this.employees = data.Data;
						// set total records
						this.totalRecords = data.TotalRecords;
						// hide loader animation
						this.showLoader = false;
					})
					.catch((error) => {
						this.handleShowToast(
							error.response.data.userMsg,
							toastModes.danger.backgroundColor,
							toastModes.danger.icon
						);
						this.showLoader = false;
					});
			} catch (e) {
				console.log(e);
				this.showLoader = false;
			}
		},

		/**
		 * get employee list from api base on keyword, will be merge into getEmployees method later on`
		 * author: Trinh Quy Cong 1/7/22
		 */
		searchEmployees(keyword) {
			try {
				const me = this;

				clearTimeout(me.timeOutSearchEmployee);

				this.timeOutSearchEmployee = setTimeout(() => {
					me.showLoader = true;
					me.$http
						.get(`${apiUrls.employee}?keyword=${keyword}&size=${this.pageSize}`)
						.then((response) => {
							const data = response.data;
							me.employees = data.Data;
							me.totalRecords = data.TotalRecords;

							me.showLoader = false;
						})
						.catch((error) => {
							console.log(error);
							me.showLoader = false;
						});
				}, 500);
			} catch (error) {
				this.handleShowToast(
					error.response.data.userMsg,
					toastModes.danger.backgroundColor,
					toastModes.danger.icon
				);
			}
		},
	},
};

/**************************************** GENERAL NOTE
 * HANDLE DATE
 * VALIDATE
 * TOAST
 * ROUTER
 * Nút xoá
 * PAGINATION
 * UI: HEADER
 */
// $(document).ready(() => {
// 	new EmployeePage();
// });

/**
 * create enum to specify mode of form in dialog (add or update)
 * author: Trinh Quy Cong 10/6/22
 */

class EmployeePage {
	constructor() {
		this.formMode = FormModeEnum.add;
		this.employeeList = [];
		this.employeeToDelete = null;

		this.setupEvents();
		this.getEmployees(this);
	}

	/**
	 * reset value of inputs of main dialog
	 * author: Trinh Quy Cong 14/6/22
	 */
	resetDialog() {
		try {
			const inputs = document.querySelectorAll(".m-main-dialog .m-dialog-body [propName]");
			inputs.forEach((input) => {
				input.value = null;
			});
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * set up events such as click, blur,.. of dom elements
	 * author: Trinh Quy Cong 14/6/22
	 */
	setupEvents() {
		// keep this of current object
		let _this = this;

		/**
		 * add style when focusing on select page
		 * author: Trinh Quy Cong 21/6/22
		 */
		$(".m-paging-select.m-select .m-select-input").on("focus", function () {
			$(this).parents(".m-paging-select.m-select").addClass("active");
		});
		$(".m-paging-select.m-select .m-select-input").on("blur", function () {
			$(this).parents(".m-paging-select.m-select").removeClass("active");
		});
		$(".m-paging-select.m-select .m-select-button").on("click", function () {
			$(this).toggleClass("active");
			$(this).parents(".m-paging-select.m-select").addClass("active");
		});
		$(document).click(function (event) {
			let $target = $(event.target);
			if (!$target.closest(".m-paging-select.m-select").length && $(".m-paging-select.m-select").is(":visible")) {
				$(".m-paging-select.m-select").removeClass("active");
				$(".m-paging-select.m-select .m-select-button").removeClass("active");
			}
		});

		/**
		 * delete employee
		 * author: Trinh Quy Cong 13/6/22
		 */
		$("#btnDeleteAgree").click(function () {
			try {
				if (_this.employeeToDelete) {
					$.ajax({
						method: "DELETE",
						url: "https://amis.manhnv.net/api/v1/Employees/" + _this.employeeToDelete.EmployeeId,
						success: function (result) {
							if (result == 1) {
								// tb thanh cong

								//reload trang
								_this.getEmployees(_this);

								// ẩn confirm delete dialog
								$(".m-dialog.m-confirm-delete-dialog").hide();
							} else {
								// tb loi
							}
						},
					});
				}
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * show confirm delete dialog
		 * author: Trinh Quy Cong 13/6/22
		 */
		$(document).on("click", ".m-dropdown-content-delete li.delete", function () {
			try {
				$(".m-dialog.m-confirm-delete-dialog .m-dialog-body-text").text(
					`Bạn có thực sự muốn xoá nhân viên <${_this.employeeToDelete.EmployeeCode}> không?`
				);
				$(".m-dialog.m-confirm-delete-dialog").show();
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * hide dialog when click on close button (can be used for any dialog)
		 * author: Trinh Quy Cong 13/6/22
		 */
		$(
			".m-dialog .m-dialog-content .m-dialog-close .m-button-cancel, .m-dialog .m-dialog-content .m-dialog-footer .m-button-cancel"
		).click(function () {
			try {
				$(this).parents(".m-dialog").hide();
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * when click on button add new employee
		 * author: Trinh Quy Cong 10/6/22
		 */
		$("#btnNewEmployee").click(() => {
			try {
				// set form mode
				this.formMode = FormModeEnum.add;
				// reset previous form
				this.resetDialog();
				// get employee code and add to input
				let employeeId = null;
				$.ajax({
					method: "GET",
					url: "https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode",
					success: function (result) {
						console.log(result);
						employeeId = result;

						$('[name="emp-id"]').val(employeeId);
						$('[name="emp-id"]').focus();
					},
				});
				// show dialog
				$(".m-main-dialog").show();
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * highlight table row when being clicked
		 * author: Trinh Quy Cong 16/6/22
		 */
		$(document).on("click", "table#mainTable tr", function () {
			document.querySelectorAll("table#mainTable tr").forEach((el) => el.classList.remove("active"));
			$(this).addClass("active");
		});

		/**
		 * reload employee list
		 * author: Trinh Quy Cong 10/6/22
		 */
		$("#btnReload").click(() => {
			_this.getEmployees(_this);
		});

		/**
		 * toggle functionality list of each table row
		 * author: Trinh Quy Cong 9/6/22
		 */
		$(document).on("click", ".m-dropdown-button-right", function () {
			try {
				const x = $(this).parents(".m-dropdown").offset().left;
				const y = $(this).parents(".m-dropdown").offset().top;
				$(".m-dropdown-content")
					.css({
						left: x - 20,
						top: y + 20,
					})
					.toggle();

				let employeeCode = $(this).parents("tr").find("td.emp-id").text();
				let employee = _this.employeeList.find((emp) => emp.EmployeeCode == employeeCode);
				if (employee) {
					_this.employeeToDelete = employee;
				}
			} catch (e) {
				console.log(e);
			}
		});

		$("html").click(function () {
			$(".m-dropdown-content").hide();
		});

		$(document).on("click", "td.emp-action", function (e) {
			e.stopPropagation();
		});

		/**
		 * show update/view employee dialog when double click on table row
		 * author: Trinh Quy Cong 16/6/22
		 */
		$(document).on("dblclick", "table#mainTable tr", function () {
			try {
				_this.formMode = FormModeEnum.update;
				const employeeId = $(this).find("td.emp-id").html();
				$.ajax({
					method: "GET",
					url: "https://amis.manhnv.net/api/v1/Employees/filter?employeeFilter=" + employeeId,
					success: function (result) {
						const employee = result.Data[0];
						const inputs = document.querySelectorAll(".m-main-dialog .m-dialog-body [propName]");
						inputs.forEach((input) => {
							const key = input.getAttribute("propName");
							if (input.type === "date") {
								const date = new Date(employee[key]).toJSON().slice(0, 10).split("-").join("-");
								input.value = date;
							} else {
								input.value = employee[key]; // gán giá trị từng trường từ employee cho input
							}
						});
					},
				});

				$(".m-main-dialog").show();
				$(".m-main-dialog .m-dialog-body input[name='emp-id']").focus();
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * show update/view employee dialog when click on edit button of each table row
		 * author: Trinh Quy Cong 9/6/22
		 */
		$(document).on("click", ".m-dropdown-button-modify", function () {
			try {
				_this.formMode = FormModeEnum.update;
				const employeeId = $(this).parents("tr").find("td.emp-id").html();
				$.ajax({
					method: "GET",
					url: "https://amis.manhnv.net/api/v1/Employees/filter?employeeFilter=" + employeeId,
					success: function (result) {
						const employee = result.Data[0];
						const inputs = document.querySelectorAll(".m-main-dialog .m-dialog-body [propName]");
						inputs.forEach((input) => {
							const key = input.getAttribute("propName");
							if (input.type === "date") {
								const date = new Date(employee[key]).toJSON().slice(0, 10).split("-").join("-");
								input.value = date;
							} else {
								input.value = employee[key]; // gán giá trị từng trường từ employee cho input
							}
						});
					},
				});

				$(".m-main-dialog").show();
				$(".m-main-dialog .m-dialog-body input[name='emp-id']").focus();
			} catch (e) {
				console.log(e);
			}
		});

		$(".m-dialog-close .m-button-cancel, .m-dialog-footer .m-button-cancel").click(function () {
			$(".m-main-dialog").hide();
		});

		/**
		 * validate view/update dialog
		 * author: Trinh Quy Cong 9/6/22
		 */
		$("#btnSaveAndAdd").click(() => {
			try {
				const isFormValid = _this.validateFormBeforeSubmitting();
				if (!isFormValid) {
					return;
				}

				if (this.formMode === FormModeEnum.add) {
					// build object
					const employee = _this.buildEmployeeObject();

					// call ajax
					$.ajax({
						method: "POST",
						url: "https://amis.manhnv.net/api/v1/Employees",
						data: JSON.stringify(employee),
						dataType: "json",
						contentType: "application/json",
						success: function (result) {
							if (result == 1) {
								$(".m-main-dialog").hide();
								_this.getEmployees(_this);
								// show response message
							}
						},
					});
				} else if (this.formMode === FormModeEnum.update) {
					// get employee code
					const employeeCode = $('[name="emp-id"]').val(); // get employee code from form
					const employeeFromList = this.employeeList.find(
						(employee) => employee.EmployeeCode == employeeCode
					); // find employee base on employee code
					const employeePrimaryKey = employeeFromList != null ? employeeFromList.EmployeeId : null; // get employee's id to use api to update

					// build object
					const employee = _this.buildEmployeeObject();

					// call ajax
					$.ajax({
						method: "PUT",
						url: "https://amis.manhnv.net/api/v1/Employees/" + employeePrimaryKey,
						data: JSON.stringify(employee),
						dataType: "json",
						contentType: "application/json",
						success: function (result) {
							if (result == 1) {
								$(".m-main-dialog").hide();
								// show response message
								_this.getEmployees(_this);
							}
						},
					});
				}
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * check if each input is valid after being blurred
		 * author: Trinh Quy Cong 11/6/22
		 */
		$(".m-main-dialog .m-dialog-body [propName]").blur(function (e) {
			try {
				const input = e.currentTarget;
				// nếu input là required và chưa được nhập
				if (input.hasAttribute("required") && !input.value) {
					input.setAttribute("invalid", true);
					switch (input.name) {
						case "emp-id":
							$(input)
								.parents(".m-row-input")
								.find(".m-input-error-label")
								.text("Mã nhân viên không được để trống");
							break;
						case "emp-name":
							$(input)
								.parents(".m-row-input")
								.find(".m-input-error-label")
								.text("Tên nhân viên không được để trống");
							break;
						case "emp-organization":
							$(input)
								.parents(".m-row-input")
								.find(".m-input-error-label")
								.text("Tên đơn vị không được để trống");
							break;
						default:
							$(input)
								.parents(".m-row-input")
								.find(".m-input-error-label")
								.text("Trường này không được để trống");
					}
				} else {
					input.removeAttribute("invalid");
				}

				// kiểm tra format khác (email, ..)
				if (input.name === "emp-email" && input.value) {
					const isValid = _this.isEmailValid(input.value);
					if (!isValid) {
						input.setAttribute("invalid", true);
						$(input).parents(".m-row-input").find(".m-input-error-label").text("Email chưa đúng định dạng");
					} else {
						input.removeAttribute("invalid");
					}
				}
			} catch (e) {
				console.log(e);
			}
		});

		/**
		 * hide error message dialog
		 * author: Trinh Quy Cong 9/6/22
		 */
		$(".m-error-message-dialog .m-dialog-footer .m-button").click(function () {
			$(this).parents(".m-error-message-dialog").hide();
		});
	}

	/**
	 * build employee object from inputs in dialog and return that object
	 * author: Trinh Quy Cong 11/6/22
	 */
	buildEmployeeObject() {
		try {
			const employee = {};
			const inputs = document.querySelectorAll(".m-main-dialog .m-dialog-body [propName]");
			inputs.forEach((input) => {
				const key = input.getAttribute("propName");
				if (input.type === "date" && input.value) {
					let date = new Date(input.value).toJSON().slice(0, 10).split("-").join("-");
					employee[key] = date;
				} else {
					employee[key] = input.value;
				}
			});
			return employee;
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * check if email in valid format
	 * author: Trinh Quy Cong 11/6/22
	 */
	isEmailValid(email) {
		try {
			const regexEmail =
				/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
			return String(email).toLowerCase().match(regexEmail);
		} catch (e) {
			console.log(e);
		}
	}

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
	}

	/**
	 * get list of employees from api
	 * author: Trinh Quy Cong 10/6/22
	 */
	getEmployees(_this) {
		try {
			$("#mainTable tbody").empty(); //clear table
			$.ajax({
				// url: "https://amis.manhnv.net/api/v1/Employees/filter?pageSize=20&pageNumber=2",
				url: "https://amis.manhnv.net/api/v1/Employees/filter?",
				method: "GET",
				success: function (result) {
					const data = result.Data;

					data.forEach((emp) => {
						_this.employeeList.push(emp);

						let html = `
						<tr>
							<td><input type="checkbox" name="check-row" id="" /></td>
							<td class="emp-id">${emp.EmployeeCode}</td>
							<td>${emp.FullName ? emp.FullName : "-"}</td>
							<td>${emp.GenderName ? emp.GenderName : "-"}</td>
							<td class="emp-dob">${_this.formatDate(emp.DateOfBirth)}</td>
							<td>${emp.IdentityNumber ? emp.IdentityNumber : "-"}</td>
							<td>${emp.EmployeePosition ? emp.EmployeePosition : "-"}</td>
							<td>${emp.DepartmentName ? emp.DepartmentName : ""}</td>
							<td>${emp.BankAccountNumber ? emp.BankAccountNumber : "-"}</td>
							<td>${emp.BankName ? emp.BankName : "-"}</td>
							<td>${emp.WorkStatus ? emp.WorkStatus : "-"}</td>
							<td>${emp.BankBranchName ? emp.BankBranchName : "-"}</td>
							<td class="emp-action">
								<div class="m-dropdown">
									<button class="m-dropdown-button-modify m-dropdown-button m-dropdown-button-left">
										<div class="m-small-wrapper">Sửa</div>
									</button>
									<button class="m-dropdown-button m-dropdown-button-right">
										<div class="m-small-wrapper">
											<i class="fa-solid fa-caret-down"></i>
										</div>
									</button>
								</div>
							</td>
						</tr>
						`;
						$("#mainTable tbody").append(html);
					});

					$(".m-paging-total-records").html(`Tổng số: <b>${data.length}</b> bản ghi`);
				},
			});
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * validate form before submitting
	 */
	validateFormBeforeSubmitting() {
		try {
			let requiredMessages = [];
			let formatMessages = [];
			let theFirstInvalidInput = null;

			// lặp qua các input
			const inputs = document.querySelectorAll(".m-main-dialog .m-dialog-body [propName]");
			inputs.forEach((input) => {
				// nếu input là required và chưa được nhập
				if (input.hasAttribute("required") && !input.value) {
					switch (input.name) {
						case "emp-id":
							theFirstInvalidInput = theFirstInvalidInput == null ? input : theFirstInvalidInput;
							requiredMessages.push("Vui lòng nhập mã nhân viên");
							break;
						case "emp-name":
							theFirstInvalidInput = theFirstInvalidInput == null ? input : theFirstInvalidInput;
							requiredMessages.push("Vui lòng nhập tên nhân viên");
							break;
						case "emp-organization":
							theFirstInvalidInput = theFirstInvalidInput == null ? input : theFirstInvalidInput;
							requiredMessages.push("Vui lòng nhập đơn vị");
							break;
						default:
							theFirstInvalidInput = theFirstInvalidInput == null ? input : theFirstInvalidInput;
							requiredMessages.push(`Vui lòng nhập trường ${input.name}`);
					}
				}

				if (requiredMessages.length == 0) {
					// kiểm tra format khác (email, ..)
					if (input.name === "emp-email" && input.value) {
						const isValid = this.isEmailValid(input.value);
						if (!isValid) {
							theFirstInvalidInput = theFirstInvalidInput == null ? input : theFirstInvalidInput;
							formatMessages.push("Vui lòng nhập email đúng định dạng");
						}
					}
				}
			});

			// nếu có bất kì input nào không hợp lệ, báo lỗi và dừng việc gọi api
			if (theFirstInvalidInput) {
				let finalMessages = null;
				if (requiredMessages.length > 0) {
					finalMessages = "<p>" + requiredMessages.join("</p><p>") + "</p>";
				} else if (formatMessages.length > 0) {
					finalMessages = formatMessages.join("\n");
				}

				$(theFirstInvalidInput).focus();
				$(".m-error-message-dialog .m-dialog-body .m-dialog-body-text").html(finalMessages);
				$(".m-error-message-dialog").show();
				return false;
			}
			return true;
		} catch (e) {
			console.log(e);
		}
	}
}
</script>

<style scoped>
@import url(../../css/views/employee/employee-page.css);
</style>
