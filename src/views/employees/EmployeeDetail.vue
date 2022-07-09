<!-- eslint-disable no-debugger -->
<template>
	<div>
		<div class="m-dialog m-main-dialog">
			<div class="m-dialog-content">
				<div class="m-dialog-close">
					<button class="m-button-help"><div class="m-button-help-icon"></div></button>
					<button class="m-button-cancel" @click="$emit('onCloseMainDialog')">
						<div class="m-button-cancel-icon"></div>
					</button>
				</div>
				<div class="m-dialog-header m-row">
					<h3>Thông tin nhân viên</h3>
					<div class="m-row">
						<input type="checkbox" name="" id="" />
						<label for="">Là khách hàng</label>
					</div>
					<div class="m-row">
						<input type="checkbox" name="" id="" />
						<label for="">Là nhà cung cấp</label>
					</div>
				</div>
				<div class="m-dialog-body">
					<!-- section 1 -->
					<section class="m-dialog-body-section section-1">
						<div class="m-row">
							<div class="m-row m-row-input m-row-input-emp-id">
								<p class="m-input-label">Mã <b class="asterisk">*</b></p>
								<input
									ref="inputEmployeeCode"
									type="text"
									class="m-input"
									name="emp-id"
									required
									v-model.trim="employee.EmployeeCode"
									@blur="validateOnBlur($event)"
								/>
								<div class="m-input-error-label"></div>
							</div>
							<div class="m-row m-row-input m-row-input-emp-name">
								<p class="m-input-label">Tên <b class="asterisk">*</b></p>
								<input
									ref="inputEmployeeName"
									type="text"
									class="m-input"
									name="emp-name"
									v-model="employee.EmployeeName"
									required
									placeholder="Tên nhân viên"
									@blur="validateOnBlur($event)"
								/>
								<div class="m-input-error-label"></div>
							</div>
						</div>

						<div class="m-row m-row-input">
							<p class="m-input-label">Đơn vị <b class="asterisk">*</b></p>
							<select
								ref="inputDepartmentId"
								name="emp-organization"
								propName="DepartmentId"
								v-model="employee.DepartmentId"
								required
								@blur="validateOnBlur($event)"
							>
								<template v-for="dep in departments">
									<option :value="dep.DepartmentId" :key="dep.DepartmentId">
										{{ dep.DepartmentName }}
									</option>
								</template>
							</select>
							<div class="m-input-error-label"></div>
						</div>

						<div class="m-row m-row-input">
							<p class="m-input-label">Chức danh</p>
							<input
								ref="inputPosition"
								type="text"
								class="m-input"
								name="emp-position"
								propName="EmployeePosition"
								v-model="employee.EmployeePosition"
							/>
							<div class="m-input-error-label"></div>
						</div>
					</section>

					<!-- section 2 -->
					<section class="m-dialog-body-section section-2">
						<div class="m-row">
							<div class="m-row m-row-input m-row-input-emp-dob">
								<p class="m-input-label">Ngày sinh</p>
								<input
									ref="inputDateOfBirth"
									type="date"
									placeholder="DD-MM-YYYY"
									class="m-input"
									name="emp-dob"
									propName="DateOfBirth"
									v-model="employee.DateOfBirth"
								/>
								<div class="m-input-error-label"></div>
							</div>

							<div class="m-row m-row-input">
								<p class="m-input-label">Giới tính</p>
								<div class="m-row-checkbox-emp-gender">
									<div class="radio-wrapper">
										<input
											type="radio"
											v-model="employee.Gender"
											name="emp-gender"
											value="1"
											checked
											class="m-checkbox"
											id="empGenderMale"
										/>
										<label for="empGenderMale">Nam</label>
									</div>
									<div class="radio-wrapper">
										<input
											type="radio"
											v-model="employee.Gender"
											name="emp-gender"
											value="0"
											class="m-checkbox"
											id="empGenderFemale"
										/>
										<label for="empGenderFemale">Nữ</label>
									</div>
									<div class="radio-wrapper">
										<input
											type="radio"
											v-model="employee.Gender"
											name="emp-gender"
											value="2"
											class="m-checkbox"
											id="empGenderOther"
										/>
										<label for="empGenderOther">Khác</label>
									</div>
								</div>
								<div class="m-input-error-label"></div>
							</div>
						</div>

						<div class="m-row">
							<div class="m-row m-row-input m-row-input-emp-identification-number">
								<p class="m-input-label">Số CMND</p>
								<input
									ref="inputIdentityNumber"
									type="text"
									class="m-input"
									name="emp-identification-number"
									propName="IdentityNumber"
									v-model="employee.IdentityNumber"
								/>
								<div class="m-input-error-label"></div>
							</div>

							<div class="m-row m-row-input m-row-input-emp-identification-number-release-date">
								<p class="m-input-label">Ngày cấp</p>
								<input
									ref="inputIdentityDate"
									type="date"
									placeholder="DD-MM-YYYY"
									class="m-input"
									name="emp-identification-number-release-date"
									propName="IdentityDate"
									v-model="employee.IdentityDate"
								/>
								<div class="m-input-error-label"></div>
							</div>
						</div>

						<div class="m-row m-row-input m-row-input-emp-identification-number-release-place">
							<p class="m-input-label">Nơi cấp</p>
							<input
								ref="inputIdentityPlace"
								type="text"
								class="m-input"
								name="emp-identification-number-release-place"
								propName="IdentityPlace"
								v-model="employee.IdentityPlace"
							/>
							<div class="m-input-error-label"></div>
						</div>
					</section>

					<section class="m-dialog-body-section section-3">
						<div class="m-row m-row-input">
							<p class="m-input-label">Địa chỉ</p>
							<input
								ref="inputAddress"
								type="text"
								class="m-input"
								name="emp-address"
								propName="Address"
								v-model="employee.Address"
							/>
							<div class="m-input-error-label"></div>
						</div>

						<div class="m-row m-row-phone-and-email">
							<div class="m-row m-row-input">
								<p class="m-input-label">ĐT di động</p>
								<input
									ref="inputMobilePhoneNumber"
									type="text"
									class="m-input"
									name="emp-mobile-phone-number"
									propName="PhoneNumber"
									v-model="employee.PhoneNumber"
								/>
								<div class="m-input-error-label"></div>
							</div>
							<div class="m-row m-row-input">
								<p class="m-input-label">ĐT cố định</p>
								<input
									ref="inputStablePhoneNumber"
									type="text"
									class="m-input"
									name="emp-stable-phone-number"
									propName="PhoneNumber"
									v-model="employee.PhoneNumber"
								/>
								<div class="m-input-error-label"></div>
							</div>
							<div class="m-row m-row-input">
								<p class="m-input-label">Email</p>
								<input
									ref="inputEmail"
									type="text"
									class="m-input"
									name="emp-email"
									propName="Email"
									v-model="employee.Email"
									email
									@blur="validateOnBlur($event)"
								/>
								<div class="m-input-error-label"></div>
							</div>
						</div>

						<div class="m-row m-row-bank-info">
							<div class="m-row m-row-input">
								<p class="m-input-label">Tài khoản ngân hàng</p>
								<input
									ref="inputBankNumber"
									type="text"
									class="m-input"
									name="emp-bank-number"
									propName="BankAccountNumber"
									v-model="employee.BankAccountNumber"
								/>
								<div class="m-input-error-label"></div>
							</div>
							<div class="m-row m-row-input">
								<p class="m-input-label">Tên ngân hàng</p>
								<input
									ref="inputBankName"
									type="text"
									class="m-input"
									name="emp-bank-name"
									propName="BankName"
									v-model="employee.BankName"
								/>
							</div>
							<div class="m-row m-row-input">
								<p class="m-input-label">Chi nhánh</p>
								<input
									ref="inputBankBranchName"
									type="text"
									class="m-input"
									name="emp-bank-branch"
									propName="BankBranchName"
									v-model="employee.BankBranchName"
								/>
								<div class="m-input-error-label"></div>
							</div>
						</div>
					</section>
				</div>
				<div class="m-dialog-footer m-row">
					<div class="m-button-group">
						<button class="m-button m-button-primary" id="btnSaveAndAdd" @click="handleSaveAndOrAdd(1)">
							Cất và Thêm
						</button>
						<button class="m-button m-button-secondary" id="btnSave" @click="handleSaveAndOrAdd(0)">
							Cất
						</button>
					</div>
					<button class="m-button-cancel m-button m-button-secondary" @click="$emit('onCloseMainDialog')">
						Huỷ
					</button>
				</div>
			</div>
		</div>

		<!-- error message dialog -->
		<InfoDialog
			id="errorMessageDialog"
			v-show="showErrorMessageDialog"
			showBody
			closeButtonPrimary
			closeButtonText="Đóng"
			:body="toHtmlMessage(errors)"
			@onCloseInfoDialog="handleCloseInfoDialog"
		/>
	</div>
</template>

<script>
import Employee from "../../models/Employee.model.js";
import { apiUrls, FormModeEnum, errorValidationMessageEmployee } from "../../utils.js";
import InfoDialog from "../../components/base/InfoDialog.vue";
import { toastModes } from "../../components/base/ToastNotifier.vue";

export default {
	components: { InfoDialog },
	props: {
		//
		employeeProp: Employee,
		//
		formModeProp: FormModeEnum.add,
	},

	data() {
		return {
			// employee entity to display, add, update or delete
			employee: this.employeeProp,

			// form mode: add or update
			formMode: this.formModeProp,

			// array for showing message in the error message dialog
			errors: [],

			// show error message dialog or not
			showErrorMessageDialog: false,

			// check if the form is modified or not
			isModified: false,

			// department list
			departments: [],

			// element to focus on
			elementToFocus: this.$refs.inputEmployeeCode,
		};
	},

	watch: {
		/**
		 * if the form is modified, update the variable
		 * author: Trinh Quy Cong 2/7/22
		 */
		employee(prevValue, newValue) {
			this.isModified = true;
		},
	},

	methods: {
		/**
		 * cập nhật hoặc thêm employee
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleSaveAndOrAdd(mode) {
			try {
				// thêm mới
				if (this.formMode === FormModeEnum.add) {
					// validate data
					if (!this.validateOnSubmit()) {
						// show error dialog
						this.showErrorMessageDialog = true;
						this.elementToFocus.focus();

						return;
					}

					debugger;

					// call api post
					this.$http
						.post(apiUrls.employee, this.employee)
						.then((response) => {
							console.log(response);
							const row = response.data;
							// display result
							// them thanh cong
							if (row == 1) {
								this.$emit("onReloadEmployeeList");

								//nếu mode là "cất"
								if (mode == 0) {
									this.$emit("onCloseMainDialog");
								}
								// nếu mode là "cất và thêm"
								else if (mode == 1) {
									this.$http
										.get(`${apiUrls.employee}/NewEmployeeCode`)
										.then((data) => {
											const employeeCode = data.data;
											let employee = new Employee();
											employee.EmployeeCode = employeeCode;
											this.employee = employee;
										})
										.catch((error) =>
											this.handleShowToast(
												error.response.data.userMsg,
												toastModes.danger.backgroundColor,
												toastModes.danger.icon
											)
										);
								}
								//
								console.log("them thanh cong");
								this.$emit(
									"onShowToast",
									"Thêm nhân viên thành công",
									toastModes.success.backgroundColor,
									toastModes.success.icon
								);
							} else {
								//
							}
						})
						.catch((error) => {
							console.log(error);
							this.$emit(
								"onShowToast",
								"Có lỗi xảy ra",
								toastModes.danger.backgroundColor,
								toastModes.danger.icon
							);
						});

					// console.log({ employee: this.employee, "form mode": this.formMode });
				} else if (this.formMode === FormModeEnum.update) {
					// validate data
					if (!this.validateOnSubmit()) {
						// show error dialog
						this.showErrorMessageDialog = true;
						return;
					}

					// call api put
					this.$http
						.put(`${apiUrls.employee}/${this.employee.EmployeeId}`, this.employee)
						.then((response) => {
							console.log(response);
							const row = response.data;
							// display result
							// them thanh cong
							if (row == 1) {
								const employee = JSON.parse(response.config.data);
								this.$emit("onReloadEmployeeList");
								//
								//nếu mode là "cất"
								if (mode == 0) {
									this.$emit("onCloseMainDialog");
								}
								// nếu mode là "cất và thêm"
								else if (mode == 1) {
									this.$http
										.get(`${apiUrls.employee}/NewEmployeeCode`)
										.then((data) => {
											const employeeCode = data.data;
											let employee = new Employee();
											employee.EmployeeCode = employeeCode;
											this.employee = employee;
										})
										.catch((error) => console.log(error));
								}
								console.log("sua thanh cong");
								this.$emit(
									"onShowToast",
									"Sửa nhân viên thành công",
									toastModes.success.backgroundColor,
									toastModes.success.icon
								);
							} else {
								//
							}
						})
						.catch((error) => {
							console.log(error);
							this.$emit(
								"onShowToast",
								"Có lỗi xảy ra",
								toastModes.danger.backgroundColor,
								toastModes.danger.icon
							);
						});
				} else {
					// display error message
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * convert array of error messages to html message
		 * author: Trinh Quy Cong 30/6/22
		 */
		toHtmlMessage(errors) {
			try {
				if (errors.length > 0) {
					return "<span>" + errors.join("</span><span>") + "</span>";
				}
				return "";
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * hide info dialog
		 * author: Trinh Quy Cong 30/6/22
		 */
		handleCloseInfoDialog() {
			//reset error array
			this.errors = [];
			//hide dialog
			this.showErrorMessageDialog = false;
			// focus on the focus input
			this.elementToFocus.focus();
		},

		/**
		 * validate employee
		 * author: Trinh Quy Cong 30/6/22
		 */
		validateOnSubmit() {
			try {
				let errorMsg = "";
				let isValid = true;
				if (!this.employee.EmployeeCode) {
					isValid = false;
					errorMsg = errorValidationMessageEmployee.employeeCode.required;
					this.elementToFocus = this.$refs.inputEmployeeCode;
					this.$refs.inputEmployeeCode.setAttribute("invalid", true);
					this.$refs.inputEmployeeCode
						.closest(".m-row-input")
						.querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.employeeCode.required;
				} else {
					this.$refs.inputEmployeeCode.removeAttribute("invalid");
					// gán bằng null để những thằng input sau có thể được focus. Vì mặc định input employee code được set là focus element
					this.elementToFocus = null;
				}

				if (!this.employee.EmployeeName) {
					isValid = false;
					errorMsg = errorMsg ? errorMsg : errorValidationMessageEmployee.fullName.required;
					this.elementToFocus = this.elementToFocus ? this.elementToFocus : this.$refs.inputEmployeeName;
					this.$refs.inputEmployeeName.setAttribute("invalid", true);
					this.$refs.inputEmployeeName
						.closest(".m-row-input")
						.querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.fullName.required;
				} else {
					this.$refs.inputEmployeeName.removeAttribute("invalid");
				}
				if (!this.employee.DepartmentId) {
					isValid = false;
					errorMsg = errorMsg ? errorMsg : errorValidationMessageEmployee.departmentId.required;
					this.elementToFocus = this.elementToFocus ? this.elementToFocus : this.$refs.inputDepartmentId;
					this.$refs.inputDepartmentId.setAttribute("invalid", true);
					this.$refs.inputDepartmentId
						.closest(".m-row-input")
						.querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.departmentId.required;
				} else {
					this.$refs.inputDepartmentId.removeAttribute("invalid");
				}
				if (this.employee.Email && !this.isEmailValid(this.employee.Email)) {
					isValid = false;
					errorMsg = errorMsg ? errorMsg : errorValidationMessageEmployee.email.format;
					this.elementToFocus = this.elementToFocus ? this.elementToFocus : this.$refs.inputEmail;
					this.$refs.inputEmail.setAttribute("invalid", true);
					this.$refs.inputEmail.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.email.format;
				} else {
					this.$refs.inputEmail.removeAttribute("invalid");
				}

				this.errors = [];
				this.errors.push(errorMsg);
				return isValid;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * check email hợp lệ
		 * author: Trinh Quy Cong 30/6/22
		 */
		isEmailValid(email) {
			try {
				const regexEmail =
					/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
				return String(email).toLowerCase().match(regexEmail);
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * validate input element on blur
		 * author: Trinh Quy Cong 8/7/22
		 */
		validateOnBlur($event) {
			const target = $event.currentTarget;
			if (target.hasAttribute("required") && !target.value) {
				target.setAttribute("invalid", true);
				switch (target.name) {
					case "emp-id":
						target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
							errorValidationMessageEmployee.employeeCode.required;
						break;
					case "emp-name":
						target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
							errorValidationMessageEmployee.fullName.required;
						break;
					case "emp-organization":
						target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
							errorValidationMessageEmployee.departmentId.required;
						break;
					default:
						target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
							errorValidationMessageEmployee.common.required;
				}
			} else {
				target.removeAttribute("invalid");
			}

			if (target.hasAttribute("email") && target.value && !this.isEmailValid(target.value)) {
				target.setAttribute("invalid", true);
				target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
					errorValidationMessageEmployee.email.format;
			} else if (target.hasAttribute("email") && this.isEmailValid(target.value)) {
				target.removeAttribute("invalid");
			}
		},
	},

	/**
	 * lifecycle hook - get all departments
	 * author: Trinh Quy Cong 28/6/22
	 */
	created() {
		try {
			this.$http
				.get(apiUrls.department)
				.then((res) => {
					const data = res.data;
					this.departments = data;
				})
				.catch((error) => {
					this.handleShowToast(
						error.response.data.userMsg,
						toastModes.danger.backgroundColor,
						toastModes.danger.icon
					);
				});
		} catch (e) {
			console.log(e);
		}
	},

	/**
	 * lifecycle hook
	 * author: Trinh Quy Cong 29/6/22
	 */
	mounted() {
		try {
			// gán input employee code cho biến để focus khi mở dialog
			this.elementToFocus = this.$refs.inputEmployeeCode;
			// focus vào input
			this.elementToFocus.focus();
		} catch (e) {
			console.log(e);
		}
	},
	/**
	 * lifecycle hook
	 * author: Trinh Quy Cong 29/6/22
	 */
	updated() {},
};
</script>

<style scoped>
@import url(../../css/views/employee/employee-detail.css);

.m-dialog .m-dialog-footer {
	justify-content: space-between;
}

.m-dialog .m-dialog-content .m-row-phone-and-email .m-row-input,
.m-dialog .m-dialog-content .m-row-bank-info .m-row-input {
	max-width: 205px;
}
</style>
