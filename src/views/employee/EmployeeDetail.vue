<template>
	<div>
		<div ref="mainDialog" class="m-dialog m-main-dialog">
			<div class="m-dialog-content">
				<div class="m-dialog-close">
					<button class="m-button-help"><div class="m-button-help-icon"></div></button>
					<button class="m-button-cancel" @click="showWarningChangeDialogOrCloseMainDialog">
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
									ref="inputFullName"
									type="text"
									class="m-input"
									name="emp-name"
									v-model.trim="employee.FullName"
									required
									placeholder="Tên nhân viên"
									@blur="validateOnBlur($event)"
								/>
								<div class="m-input-error-label"></div>
							</div>
						</div>

						<div class="m-row m-row-input">
							<p class="m-input-label">Đơn vị <b class="asterisk">*</b></p>
							<el-select
								v-model="employee.DepartmentId"
								filterable
								placeholder=""
								name="emp-organization"
								ref="inputDepartmentId"
								@blur="validateOnBlur($event)"
								class="select-organization"
								popper-class="select-dropdown-organization"
								required
							>
								<el-option v-for="dep in departments" :key="dep.DepartmentId" :label="dep.DepartmentName" :value="dep.DepartmentId">
								</el-option>
							</el-select>
							<div class="m-input-error-label"></div>
						</div>

						<div class="m-row m-row-input">
							<p class="m-input-label">Chức danh</p>
							<input
								ref="inputPosition"
								type="text"
								class="m-input"
								name="emp-position"
								v-model="employee.PositionName"
							/>
							<div class="m-input-error-label"></div>
						</div>
					</section>
					<!-- end section 1 -->

					<!-- section 2 -->
					<section class="m-dialog-body-section section-2">
						<div class="m-row">
							<div class="m-row m-row-input m-row-input-emp-dob">
								<p class="m-input-label">Ngày sinh</p>
								<input
									ref="inputDateOfBirth"
									type="date"
									placeholder="dd-mm-yyyy"
									min="1960-01-01"
									max="2050-12-31"
									class="m-input input-date"
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
											v-model.number="employee.Gender"
											name="emp-gender"
											:value="genderOptions.male.value"
											checked
											class="m-checkbox"
											id="empGenderMale"
										/>
										<label for="empGenderMale">Nam</label>
									</div>
									<div class="radio-wrapper">
										<input
											type="radio"
											v-model.number="employee.Gender"
											name="emp-gender"
											:value="genderOptions.female.value"
											class="m-checkbox"
											id="empGenderFemale"
										/>
										<label for="empGenderFemale">Nữ</label>
									</div>
									<div class="radio-wrapper">
										<input
											type="radio"
											v-model.number="employee.Gender"
											name="emp-gender"
											:value="genderOptions.other.value"
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
					<!-- end section 2 -->

					<!-- section 3 -->
					<section class="m-dialog-body-section section-3">
						<div class="m-row m-row-input">
							<p class="m-input-label">Địa chỉ</p>
							<input ref="inputAddress" type="text" class="m-input" name="emp-address" propName="Address" v-model="employee.Address" />
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
								<input ref="inputBankName" type="text" class="m-input" name="emp-bank-name" propName="BankName" v-model="employee.BankName" />
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
					<!-- end section 3 -->
				</div>
				<div class="m-dialog-footer m-row">
					<div class="m-button-group">
						<button class="m-button m-button-primary" id="btnSaveAndAdd" @click="handleSaveAndOrAdd(mainDiaglogSaveMode.saveAndNew)">
							Cất và Thêm
						</button>
						<button
							ref="btnMainDialogSave"
							class="m-button m-button-secondary"
							id="btnSave"
							@click="handleSaveAndOrAdd(mainDiaglogSaveMode.saveOnly)"
						>
							Cất
						</button>
					</div>
					<button class="m-button-cancel m-button m-button-secondary" @click="showWarningChangeDialogOrCloseMainDialog">Huỷ</button>
				</div>
			</div>
		</div>

		<!-- warning change dialog -->
		<InfoDialog
			id="warningChangeDialog"
			v-show="showWarningChangeDialog"
			showDenyButton
			showConfirmButton
			showBody
			confirmButtonText="Có"
			closeButtonText="Huỷ"
			body="Dữ liệu đã bị thay đổi, bạn có muốn cất không?"
			:cssIcon="cssInfoDialog.info"
			@onCloseInfoDialog="handleCloseWarningChangeDialog"
			@onConfirm="$refs.btnMainDialogSave.click()"
		/>
		<!-- end warning change dialog -->

		<!-- error message dialog -->
		<InfoDialog
			id="errorMessageDialog"
			v-show="showErrorMessageDialog"
			showBody
			closeButtonPrimary
			closeButtonText="Đóng"
			:body="errors"
			:cssIcon="cssInfoDialog.danger"
			@onCloseInfoDialog="handleCloseErrorMessageDialog"
		/>
		<!-- end error message dialog -->

		<!-- loader -->
		<PageLoader v-show="showLoader" />
		<!-- end loader -->
	</div>
</template>

<script>
import Employee from "../../models/Employee.model.js";
import { FormModeEnum, errorValidationMessageEmployee, genders, mainDiaglogSaveMode } from "../../utils.js";
import InfoDialog, { closeInfoDialogMode, cssInfoDialog } from "../../components/base/InfoDialog.vue";
import { toastModes } from "../../components/base/ToastNotifier.vue";
import PageLoader from "../../components/base/PageLoader.vue";

// dùng để gọi API
import ServiceFactory from "../../services/ServiceFactory.js";
const EmployeeService = ServiceFactory.get("employees");
const DepartmentService = ServiceFactory.get("departments");

export default {
	components: { InfoDialog, PageLoader },
	props: {
		// prop employee từ component cha
		employeeProp: null,

		// prop form mode từ component cha
		formModeProp: null,
	},

	data() {
		return {
			// employee - đối tượng chính của form
			employee: this.employeeProp,

			// form mode: add/update
			formMode: this.formModeProp,

			// mảng thông báo lỗi để hiện lên error message dialog
			errors: [],

			// hiện error message dialog
			showErrorMessageDialog: false,

			// danh sách phòng ban (để hiển thị trong form select)
			departments: [],

			// element để focus khi bật form lên
			elementToFocus: null,

			// các giới tính cho input radio giới tính
			genderOptions: genders,

			// hiện loader
			showLoader: false,

			// dữ liệu form đã bị thay đổi hay chưa
			isModified: false,

			// dialog cảnh báo dữ liệu thay đổi trước khi thoát
			showWarningChangeDialog: false,

			// chứa các chế độ đóng info dialog
			closeInfoDialogMode: closeInfoDialogMode,

			// chứa style cho info dialog
			cssInfoDialog: cssInfoDialog,

			// chế độ "cất" hoặc "cất và thêm"
			mainDiaglogSaveMode: mainDiaglogSaveMode,
		};
	},

	watch: {
		/**
		 * khi form có bất kì thay đổi nào, data isModified được gán true
		 * author: Trinh Quy Cong 2/7/22
		 */
		employee: {
			handler(newValue, oldValue) {
				this.isModified = true;
			},
			deep: true,
		},
	},

	methods: {
		/**
		 * hiện dialog cảnh báo dữ liệu thay đổi (nếu cần) trước khi đóng main dialog
		 * author: Trinh Quy Cong 12/7/22
		 */
		showWarningChangeDialogOrCloseMainDialog() {
			try {
				if (this.isModified) {
					// hiện dialog cảnh báo
					this.showWarningChangeDialog = true;
				} else {
					// raise sự kiện tắt main dialog
					this.$emit("onCloseMainDialog");
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * thực hiện ẩn dialog cảnh báo thay đổi
		 * author: Trinh Quy Cong 12/7/22
		 */
		handleCloseWarningChangeDialog(mode) {
			try {
				// chế độ chỉ đóng dialog cảnh báo
				if (mode == this.closeInfoDialogMode.closeInfoDialogOnly) {
					// ẩn warning dialog
					this.showWarningChangeDialog = false;
				}
				// chế độ đóng dialog cảnh báo và đóng luôn form cha
				else if (mode == this.closeInfoDialogMode.closeInfoDialogAndParentDialog) {
					// báo cho component cha để unmount main dialog (sẽ ẩn luôn warning dialog)
					this.$emit("onCloseMainDialog");
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON thực thi logic thêm hoặc sửa employee
		 * param: mode là chế độ "cất" hoặc "cất và thêm"
		 * author: Trinh Quy Cong 19/7/22
		 */
		addOrUpdateEmployee(mode) {
			try {
				let methodName = "";
				if (this.formMode === FormModeEnum.add) {
					methodName = "createEmployee";
				} else if (this.formMode === FormModeEnum.update) {
					methodName = "updateEmployee";
				}

				// validate data
				if (!this.validateOnSubmit()) {
					// hiện error dialog
					this.showErrorMessageDialog = true;
					// focus vào element lỗi đầu tiên
					this.elementToFocus.focus();
					// dừng hàm
					return;
				}

				// hiện loader
				this.showLoader = true;

				// ví dụ: EmployeeService["createEmployee"] tương đương với EmployeeService.createEmployee
				EmployeeService[methodName](this.employee)
					.then((response) => {
						// ẩn loader
						this.showLoader = false;

						const row = response.data;
						// nếu thêm thành công
						if (row == 1) {
							// raise event reload employee list
							this.$emit("onReloadEmployeeList");

							//nếu chế độ thêm là "cất"
							if (mode == this.mainDiaglogSaveMode.saveOnly) {
								// raise sự kiện ẩn main dialog
								this.$emit("onCloseMainDialog");
							}
							// nếu chế độ thêm là "cất và thêm"
							// gọi API lấy mã employee code mới
							else if (mode == this.mainDiaglogSaveMode.saveAndNew) {
								EmployeeService.getNewEmployeeCode()
									.then((data) => {
										const employeeCode = data.data;
										let employee = new Employee();
										employee.EmployeeCode = employeeCode;
										// gán data employee bằng biến mới
										this.employee = employee;
									})
									.catch((error) => {
										this.handleShowToast(error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
									});
							}

							let msg = this.formMode === FormModeEnum.add ? "Thêm" : this.formMode === FormModeEnum.update ? "Sửa" : "";
							msg += " nhân viên thành công";
							// hiện toast thành công
							this.$emit("onShowToast", msg, toastModes.success.backgroundColor, toastModes.success.icon);
						}
					})
					.catch((error) => {
						// ẩn loader
						this.showLoader = false;

						// nếu có mảng thông báo lỗi, mở dialog hiển thị các lỗi đó
						if (error.response.data.data) {
							if (Array.isArray(error.response.data.data.errors)) {
								// hiện error dialog
								this.showErrorMessageDialog = true;
								// lấy ra errors từ api response và gán vào data errors
								this.errors = error.response.data.data.errors;
							}
						}

						// hiển thị toast message lỗi
						this.$emit("onShowToast", error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
					});
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * cập nhật hoặc thêm employee
		 * author: Trinh Quy Cong 29/6/22
		 */
		handleSaveAndOrAdd(mode) {
			try {
				this.addOrUpdateEmployee(mode);
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * thực hiện ẩn error message dialog
		 * author: Trinh Quy Cong 30/6/22
		 */
		handleCloseErrorMessageDialog(mode) {
			try {
				//reset error array
				this.errors = [];
				//hide dialog
				this.showErrorMessageDialog = false;
				// focus on the focus input
				this.elementToFocus.focus();
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * validate form khi kích vào nút "cất" hoặc "cất và thêm"
		 * trả về true nếu form valid, ngược lại trả về false
		 * author: Trinh Quy Cong 30/6/22
		 */
		validateOnSubmit() {
			try {
				// biến lưu thông báo lỗi
				let errorMsg = "";

				// biến trạng thái form có valid hay không
				let isValid = true;

				// nếu trường employee code trống (check qua data employee được vì đã dùng v-model trong input control)
				if (!this.employee.EmployeeCode) {
					// cập nhật biến valid
					isValid = false;
					// cập nhật biến error
					errorMsg = errorValidationMessageEmployee.employeeCode.required;
					// element lỗi để focus vào sau khi đưa ra thông báo lỗi
					this.elementToFocus = this.$refs.inputEmployeeCode;
					// set thuộc tính invalid cho input lỗi
					this.$refs.inputEmployeeCode.setAttribute("invalid", true);
					// set dòng text thông báo lỗi cho tooltip hiển thị khi hover vào input lỗi
					this.$refs.inputEmployeeCode.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.employeeCode.required;
				} else {
					// nếu employee code valid, bỏ thuộc tính invalid
					this.$refs.inputEmployeeCode.removeAttribute("invalid");
					// gán bằng null để những thằng input sau có thể được focus. Vì mặc định input employee code được set là focus element. Nếu không gán bằng null ở đây, các input không hợp lệ còn lại sẽ không được focus vào
					this.elementToFocus = null;
				}

				// check trường full name
				if (!this.employee.FullName) {
					isValid = false;
					errorMsg = errorMsg ? errorMsg : errorValidationMessageEmployee.fullName.required;
					this.elementToFocus = this.elementToFocus ? this.elementToFocus : this.$refs.inputFullName;
					this.$refs.inputFullName.setAttribute("invalid", true);
					this.$refs.inputFullName.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.fullName.required;
				} else {
					this.$refs.inputFullName.removeAttribute("invalid");
				}

				// vì dùng element ui nên không thể set ref, nên element phải lấy trực tiếp từ DOM
				// lấy ra thẻ input bên trong el-select element. Lưu ý: đây là thẻ input chứ không phải thẻ select
				const selectDepartmentEl = document.querySelector('[name="emp-organization"]');
				if (!this.employee.DepartmentId) {
					isValid = false;

					errorMsg = errorMsg ? errorMsg : errorValidationMessageEmployee.departmentId.required;
					this.elementToFocus = this.elementToFocus ? this.elementToFocus : selectDepartmentEl;

					// set thuộc tính invalid cho input control
					selectDepartmentEl.setAttribute("invalid", true);
					// set thuộc tính invalid cho thẻ select (cha của input)
					selectDepartmentEl.closest(".el-select").setAttribute("invalid", true);
					// set dòng text lỗi cho tooltip hiển thị khi hover vào input lỗi
					selectDepartmentEl.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
						errorValidationMessageEmployee.departmentId.required;
				} else {
					// bỏ thuộc tính invalid ở cả cha và con (select và input)
					selectDepartmentEl.removeAttribute("invalid");
					selectDepartmentEl.closest(".el-select").removeAttribute("invalid");
				}

				// nếu trường email có dữ liệu nhưng không đúng định dạng
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

				// reset data errors
				this.errors = [];
				// đẩy thông báo lỗi vào
				this.errors.push(errorMsg);
				// trả về trạng thái true/false
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
				const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
				return String(email).toLowerCase().match(regex);
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * validate các input control khi blur
		 * author: Trinh Quy Cong 8/7/22
		 */
		validateOnBlur($event) {
			try {
				// lấy ra target của sự kiện blur
				const target = $event.currentTarget || $event.target;

				// nếu là thẻ input bên trong thẻ select department, xử lý theo cách riêng
				if (target.name == "emp-organization") {
					// lấy ra thẻ cha của input
					const selectEl = target.closest(".el-select");
					// cần delay 0.1 giây vì sự kiện blur xảy ra trước khi giá trị của input được set (ta sẽ blur trước khi chọn được giá trị trong ô select). Sau delay thì giá trị input mới được nhận
					setTimeout(function () {
						if (selectEl && selectEl.hasAttribute("required") && !target.value) {
							target.setAttribute("invalid", true);
							selectEl.setAttribute("invalid", true);
							target.closest(".m-row-input").querySelector(".m-input-error-label").textContent =
								errorValidationMessageEmployee.departmentId.required;
						} else if (selectEl) {
							target.removeAttribute("invalid");
							selectEl.removeAttribute("invalid");
						}
					}, 100);
				}
				// nếu là thẻ input thông thường
				else {
					// nếu input là bắt buộc mà lại không được nhập
					if (target.hasAttribute("required") && !target.value) {
						// gán thuộc tính cho input
						target.setAttribute("invalid", true);
						// dòng thông báo lỗi tuỳ vào tên của input
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
						// bỏ thuộc tính nếu hợp lệ
						target.removeAttribute("invalid");
					}

					// nếu input là email đã được nhập nhưng không hợp lệ
					if (target.hasAttribute("email") && target.value && !this.isEmailValid(target.value)) {
						target.setAttribute("invalid", true);
						target.closest(".m-row-input").querySelector(".m-input-error-label").textContent = errorValidationMessageEmployee.email.format;
					}
					// nếu input là email và hợp lệ
					else if (target.hasAttribute("email") && this.isEmailValid(target.value)) {
						target.removeAttribute("invalid");
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
	},

	created() {
		try {
			// lấy ra ds department để hiện thị lên form
			DepartmentService.getAll()
				.then((res) => {
					const data = res.data.Data;
					this.departments = data;
				})
				.catch((error) => {
					this.handleShowToast(error.response.data.userMsg, toastModes.danger.backgroundColor, toastModes.danger.icon);
				});
		} catch (e) {
			console.log(e);
		}
	},

	mounted() {
		try {
			// gán input employee code cho biến để focus khi mở dialog
			this.elementToFocus = this.$refs.inputEmployeeCode;
			// focus vào input employee code (mặc định)
			this.elementToFocus ? this.elementToFocus.focus() : "";
		} catch (e) {
			console.log(e);
		}
	},
};
</script>

<style scoped>
@import url(../../css/views/employee/employee-detail.css);

.m-dialog.m-main-dialog .m-dialog-footer {
	justify-content: space-between;
}

.m-dialog.m-main-dialog .m-dialog-content .m-row-phone-and-email .m-row-input,
.m-dialog.m-main-dialog .m-dialog-content .m-row-bank-info .m-row-input {
	max-width: 205px;
}

.m-dialog .m-dialog-content {
	min-width: 900px;
	max-width: 900px;
	width: 900px;
}
</style>
