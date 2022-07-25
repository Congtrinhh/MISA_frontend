<template>
	<div>
		<form id="mainForm" novalidate="true" @submit="($event) => $event.preventDefault()">
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
							<input type="checkbox" id="customerCheckbox" />
							<label for="customerCheckbox">Là khách hàng</label>
						</div>
						<div class="m-row">
							<input type="checkbox" id="vendorCheckbox" />
							<label for="vendorCheckbox">Là nhà cung cấp</label>
						</div>
					</div>
					<div class="m-dialog-body">
						<!-- section 1 -->
						<section class="m-dialog-body-section section-1">
							<div class="m-row">
								<div class="m-row m-row-input m-row-input-emp-id">
									<p class="m-input-label">Mã <b class="asterisk">*</b></p>
									<input
										type="text"
										ref="inputEmployeeCode"
										v-model="employee.EmployeeCode"
										placeholder="Mã nhân viên"
										class="m-input"
										cName="employeeCode"
										:class="{ invalid: errors.employeeCode }"
										required
										cMessageRequired="Mã nhân viên không được để trống."
										@input="validateControl($event)"
										@blur="validateControl($event)"
									/>
									<div
										v-if="errors.employeeCode"
										class="m-input-error-label"
										:class="{ invalid: errors.employeeCode }"
									>
										{{ errors.employeeCode[0] }}
									</div>
								</div>
								<div class="m-row m-row-input m-row-input-emp-name">
									<p class="m-input-label">Tên <b class="asterisk">*</b></p>
									<input
										type="text"
										v-model="employee.FullName"
										placeholder="Tên nhân viên"
										class="m-input"
										:class="{ invalid: errors.fullName }"
										cName="fullName"
										required
										cMessageRequired="Tên không được để trống."
										@blur="validateControl($event)"
										@input="validateControl($event)"
									/>
									<div
										v-if="errors.fullName"
										class="m-input-error-label"
										:class="{ invalid: errors.fullName }"
									>
										{{ errors.fullName[0] }}
									</div>
								</div>
							</div>

							<div class="m-row m-row-input">
								<p class="m-input-label">Đơn vị <b class="asterisk">*</b></p>
								<MSelect
									:options="departments"
									v-model="employee.DepartmentId"
									name="emp-organization"
									cName="departmentId"
									cMessageRequired="Phòng ban không được để trống."
									required
									class="select-organization m-select-wrapper"
									:class="{ invalid: errors.departmentId }"
									@change="validateControl($event)"
								/>
								<div
									v-if="errors.departmentId"
									class="m-input-error-label"
									:class="{ invalid: errors.departmentId }"
								>
									{{ errors.departmentId[0] }}
								</div>
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
									<div class="m-input-label tooltip-parent">
										Số CMND
										<div class="tooltip">Số chứng minh nhân dân</div>
									</div>
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
										propName="Email"
										v-model="employee.Email"
										name="emp-email"
										class="m-input"
										cName="employeeEmail"
										email
										cMessageEmail="Email phải đúng định dạng."
										:class="{ invalid: errors.employeeEmail }"
										@input="validateControl($event)"
									/>
									<div
										v-if="errors.employeeEmail"
										class="m-input-error-label"
										:class="{ invalid: errors.employeeEmail }"
									>
										{{ errors.employeeEmail[0] }}
									</div>
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
						<!-- end section 3 -->
					</div>
					<div class="m-dialog-footer m-row">
						<div class="m-button-group">
							<button
								class="m-button m-button-primary"
								id="btnSaveAndAdd"
								@click="addOrUpdateEmployee(mainDiaglogSaveMode.saveAndNew, 'mainForm')"
							>
								Cất và Thêm
							</button>
							<button
								ref="btnMainDialogSave"
								class="m-button m-button-secondary"
								id="btnSave"
								@click="addOrUpdateEmployee(mainDiaglogSaveMode.saveOnly, 'mainForm')"
							>
								Cất
							</button>
						</div>
						<button
							class="m-button-cancel m-button m-button-secondary"
							@click="showWarningChangeDialogOrCloseMainDialog"
						>
							Huỷ
						</button>
					</div>
				</div>
			</div>
		</form>

		<!-- warning change dialog -->
		<InfoDialog
			id="warningChangeDialog"
			v-show="showWarningChangeDialog"
			:config="infoDialogConfig"
			@onCloseInfoDialog="handleCloseWarningChangeDialog"
			@onConfirm="$refs.btnMainDialogSave.click()"
		/>
		<!-- end warning change dialog -->

		<!-- info dialog -->
		<InfoDialog
			id="errorMessageDialog"
			v-show="showErrorMessageDialog"
			:config="infoDialogConfig"
			@onCloseInfoDialog="handleCloseErrorMessageDialog"
		/>
		<!-- end info dialog -->

		<!-- loader -->
		<PageLoader v-show="showLoader" />
		<!-- end loader -->
	</div>
</template>

<script>
import Employee from "../../models/Employee.model.js";
import { FormModeEnum, genders, mainDiaglogSaveMode } from "../../utils.js";
import InfoDialog, { closeInfoDialogMode, cssInfoDialog } from "../../components/base/InfoDialog.vue";
import { toastModes } from "../../components/base/ToastNotifier.vue";
import PageLoader from "../../components/base/PageLoader.vue";
import MSelect from "@/components/base/MSelect.vue";
import defaultMessages from "@/resources/employeeDetailMessage";

// dùng để gọi API
import ServiceFactory from "../../services/ServiceFactory.js";
const EmployeeService = ServiceFactory.get("employees");
const DepartmentService = ServiceFactory.get("departments");

export default {
	components: { InfoDialog, PageLoader, MSelect },
	props: {
		// prop employee từ component cha
		employeeProp: null,

		// prop form mode từ component cha
		formModeProp: null,
	},

	computed: {
		/**
		 * trả về thông báo lỗi đầu tiên của trường dữ liệu lỗi đầu tiền
		 * của form
		 * author: Trinh Quy Cong 24/7/22
		 */
		firstErrorMessage() {
			const messagesEntries = Object.entries(this.errors);
			if (messagesEntries.length > 0) {
				// return message lỗi đầu tiên của key đầu tiên
				const [key, value] = messagesEntries[0];
				// key chính là giá trị của attribute cName của control (input)
				// value là 1 mảng các message lỗi của key đó. ví dụ: key fullName có value là 1 mảng message lỗi
				if (value && value.length > 0) {
					return value[0];
				}
			}
			return null;
		},
	},

	data() {
		return {
			// employee - đối tượng chính của form
			employee: this.employeeProp,

			// form mode: add/update
			formMode: this.formModeProp,

			// đối tượng chứa các mảng thông báo lỗi cho từng trường input
			errors: {},

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

			// chế độ "cất" hoặc "cất và thêm"
			mainDiaglogSaveMode: mainDiaglogSaveMode,

			// cấu hình cho info dialog
			infoDialogConfig: {},

			// vì data errors có lỗi (không nhận thay đổi) - lỗi này do Vue 2
			// dùng timer mỗi khi cập nhật data errors và set giá trị mới cho
			// timer này, sau đó dùng watch để cập nhật data errors.
			timerWatch: null,
		};
	},

	watch: {
		/**
		 * khi form có bất kì thay đổi nào, data isModified được gán true
		 * author: Trinh Quy Cong 2/7/22
		 */
		employee: {
			handler() {
				this.isModified = true;
			},
			deep: true,
		},

		/**
		 * vì data errors có lỗi (không nhận thay đổi) - lỗi này do Vue 2
		 * dùng timer mỗi khi cập nhật data errors và set giá trị mới cho
		 * timer này, sau đó dùng watch để cập nhật data errors.
		 * author: Trinh Quy Cong 26/7/22
		 */
		timerWatch() {
			this.errors = { ...this.errors };
		},
	},

	methods: {
		/**
		 * cài đặt cấu hình cho dialog cảnh báo thay đổi
		 * author: Trinh Quy Cong 24/7/22
		 */
		buildWarningChangeDialogConfig() {
			try {
				this.infoDialogConfig = {
					showBody: true,
					body: "Dữ liệu đã bị thay đổi, bạn có muốn cất không?",
					showDenyButton: true,
					showConfirmButton: true,
					confirmButtonText: "Có",
					closeButtonText: "Huỷ",
					cssIcon: cssInfoDialog.info,
				};
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * cài đặt cấu hình cho dialog báo lỗi
		 * author: Trinh Quy Cong 24/7/22
		 */
		buildErrorMessageDialogConfig() {
			try {
				this.infoDialogConfig = {
					showBody: true,
					body: this.firstErrorMessage,
					closeButtonPrimary: true,
					closeButtonText: "Đóng",
					showDenyButton: false,
					showConfirmButton: false,
					showDialogClose: false,
					cssIcon: cssInfoDialog.danger,
				};
			} catch (e) {
				console.log(e);
			}
		},
		/**
		 * hiện dialog cảnh báo dữ liệu thay đổi (nếu cần) trước khi đóng main dialog
		 * author: Trinh Quy Cong 12/7/22
		 */
		showWarningChangeDialogOrCloseMainDialog() {
			try {
				if (this.isModified) {
					// hiện dialog cảnh báo
					this.buildWarningChangeDialogConfig();
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
		 * thực hiện validate cho thẻ select custom (vì thẻ này có cấu trúc khác thẻ select bình thường)
		 * trả về message lỗi nếu control invalid, ngược lại trả về null
		 */
		validateCustomSelect(element) {
			try {
				// trường hợp ngoại lệ - khi các control không như mặc định
				// ví dụ trong trường hợp này: dùng Customized control
				// đang hard code cho trường hợp department id
				if (element.closest("[customizedControl]")) {
					// parentElement chính là thẻ bao bên ngoài (coi như 1 control vì nó có các attribute cName, cMessage,..)
					const parentElement = element.closest("[cName]");
					const cName = parentElement.getAttribute("cName");
					const required = parentElement.getAttribute("required");
					let errorMessageDisplay = null;
					if (required && !this.employee.DepartmentId) {
						errorMessageDisplay =
							parentElement.getAttribute("cMessageRequired") ||
							defaultMessages.defaultValidationMessageRequired;

						const customErrorMessage = parentElement.getAttribute("cMessageRequired");
						this.errors[cName] = [];
						this.timerWatch = Date.now(); // sẽ không bao giờ bị trùng, đảm bảo thay đổi để dùng watch
						this.errors[cName].push(
							customErrorMessage ? customErrorMessage : defaultMessages.defaultValidationMessageRequired
						);
					} else {
						errorMessageDisplay = null;
						delete this.errors[cName];
					}
					return errorMessageDisplay;
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON thực hiện validate control
		 * nếu control invalid, thêm trường message lỗi cho
		 * control đó trong object messages và đẩy thông báo lỗi vào
		 * author: TQCONG 22/7/22
		 */
		validateEachControl(control) {
			try {
				// name của element thông qua cName attribute (attribute này là bắt buộc)
				let elName = control.getAttribute("cName");
				// custom message (nếu có)
				let customErrorMessage = null;

				// trường hợp ngoại lệ cho thẻ custom select
				if (this.validateCustomSelect(control)) {
					return;
				}

				const tagName = control.tagName.toLowerCase();
				if (tagName == "input") {
					switch (control.type) {
						case "text":
						case "password":
						case "email":
							// kiểm tra required
							if (control.hasAttribute("required") && !control.value) {
								customErrorMessage = control.getAttribute("cMessageRequired");
								this.errors[elName] = [];
								// do lỗi vue2 không bắt được thay đổi của kiểu dữ liệu reference, phải dùng watch
								this.timerWatch = Date.now(); // sẽ không bao giờ bị trùng, đảm bảo thay đổi để dùng watch
								this.errors[elName].push(
									customErrorMessage
										? customErrorMessage
										: defaultMessages.defaultValidationMessageRequired
								);
							} else {
								delete this.errors[elName];
							}
							// kiểm tra email đúng định dạng
							if (control.hasAttribute("email") && control.value && !this.isEmailValid(control.value)) {
								customErrorMessage = control.getAttribute("cMessageEmail");
								if (!this.errors[elName]) {
									this.errors[elName] = [];
								}
								this.timerWatch = Date.now(); // sẽ không bao giờ bị trùng, đảm bảo thay đổi để dùng watch

								this.errors[elName].push(
									customErrorMessage
										? customErrorMessage
										: defaultMessages.defaultValidationMessageEmail
								);
							} else if (
								control.hasAttribute("email") &&
								control.value &&
								this.isEmailValid(control.value)
							) {
								delete this.errors[elName];
							}
							break;
						case "checkbox":
							break;
						case "radio":
							break;
					}
				} else if (tagName == "select") {
					//
				} else {
					//
				}
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * validate dữ liệu của form ngay sau khi bấm nút submit
		 * validate qua tất cả các control trong form
		 * trả về null nếu form valid, ngược lại, trả về message lỗi đầu tiên được tìm thấy
		 * author: Trinh Quy Cong 22/7/22
		 */
		validateOnSubmit(formElementId) {
			try {
				// clear mảng error, coi như mọi trường control hợp lệ
				// chỉ khi control invalid thì mới đánh dấu control là invalid (có border đỏ kèm message lỗi)
				this.errors = [];

				// thẻ form bao lấy tất cả các control và các nút submit
				const formEl = document.getElementById(formElementId);
				// lấy ra các control cần validate
				const controls = formEl.querySelectorAll("[cName]");

				// validate từng control
				for (let i = 0; i < controls.length; i++) {
					// element hiện tại
					const el = controls[i];
					this.validateEachControl(el);
				}

				// hiện message lỗi đầu tiên (nhớ là đây là mesage của form) - dù có bao nhiêu lỗi của bao nhiêu
				// element cũng chỉ lẩy lỗi đầu tiên của element lỗi đầu tiên
				// ta sẽ cứ get hết message lỗi - nhưng khi hiện info dialog sẽ chỉ lấy cái đầu tiên
				const messagesEntries = Object.entries(this.errors);
				if (messagesEntries.length > 0) {
					// return message lỗi đầu tiên của key đầu tiên
					const [key, value] = messagesEntries[0];
					// key chính là giá trị của attribute cName của control (input)
					// value là 1 mảng các message lỗi của key đó. ví dụ: key fullName có value là 1 mảng message lỗi
					if (value && value.length > 0) {
						this.elementToFocus = formEl.querySelector(`[cName=${key}]`);
						return value[0];
					}
				}
				this.elementToFocus = null;
				return null;
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * validate control (input) ở sự kiện onblur, onchange, oninput
		 * author: Trinh Quy Cong 23/7/22
		 */
		validateControl($event) {
			try {
				const element = $event.currentTarget || $event.target;
				// thực hiện validate
				this.validateEachControl(element);
			} catch (e) {
				console.log(e);
			}
		},

		/**
		 * HÀM CON thực thi logic thêm hoặc sửa employee
		 * param: mode là chế độ "cất" hoặc "cất và thêm"
		 * author: Trinh Quy Cong 19/7/22
		 */
		addOrUpdateEmployee(mode, formElementId) {
			try {
				let methodName = "";
				if (this.formMode === FormModeEnum.add) {
					methodName = "createEmployee";
				} else if (this.formMode === FormModeEnum.update) {
					methodName = "updateEmployee";
				}

				// validate data
				const formErrorMessage = this.validateOnSubmit(formElementId);
				if (formErrorMessage) {
					// hiện error dialog
					this.buildErrorMessageDialogConfig();
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
										this.handleShowToast(
											error.response.data.userMsg,
											toastModes.danger.backgroundColor,
											toastModes.danger.icon
										);
									});
							}

							let msg =
								this.formMode === FormModeEnum.add
									? defaultMessages.saveSuccess
									: defaultMessages.updateSuccess;
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
								this.buildErrorMessageDialogConfig();
								this.infoDialogConfig.cssIcon = cssInfoDialog.warning;
								this.infoDialogConfig.body = error.response.data.data.errors;
								this.showErrorMessageDialog = true;
							}
						}

						// hiển thị toast message lỗi
						this.$emit(
							"onShowToast",
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
		 * thực hiện ẩn error message dialog
		 * author: Trinh Quy Cong 30/6/22
		 */
		handleCloseErrorMessageDialog(mode) {
			try {
				//hide dialog
				this.showErrorMessageDialog = false;
				// focus on the focus input
				if (!this.elementToFocus) {
					this.elementToFocus = this.$refs.inputEmployeeCode;
				}
				this.elementToFocus.focus();
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
	},

	created() {
		try {
			// cấu hình mặc định cho dialog thông báo
			this.infoDialogConfig = {
				showDialogClose: false,
				showDenyButton: false,
				showBody: true,
				body: null,
				closeButtonText: "Close",
				closeButtonPrimary: false,
				showConfirmButton: false,
				confirmButtonText: "Agree",
				cssIcon: {
					backgroundPositionX: 0,
					backgroundPositionY: 0,
				},
			};

			// lấy ra ds department để hiện thị lên form
			DepartmentService.getAll()
				.then((res) => {
					const data = res.data.Data;
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

<style>
/* cần đặt ở đây để child component có thể nhận */
.m-row-input .m-select-wrapper.invalid input {
	border: 1px solid red !important;
}
</style>
<style scoped>
/* initial style */
/* +, DIALOG */
.m-dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	background: rgba(0, 0, 0, 0.4);
}

.m-dialog .m-dialog-content {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	background: #fff;
	padding: 20px 32px;

	border-radius: 0;
}

.m-dialog .m-dialog-content .m-dialog-header {
	margin-bottom: 24px;
	align-items: center;
}

.m-dialog .m-dialog-content .m-dialog-header h3 {
	font-family: "misa-bold";
	font-size: 24px;
	color: #111;
	font-weight: 700;
}

.m-dialog .m-dialog-content .m-dialog-header .m-row {
	margin: 0 21px;
	align-items: center;
}

.m-dialog .m-dialog-content .m-dialog-header .m-row input[type="checkbox"] {
	margin-right: 10px;
}

.m-dialog .m-dialog-content .m-row-input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.m-dialog .m-dialog-content .m-input-label {
	font-weight: bold;
}

.m-dialog .m-dialog-content .m-dialog-close {
	position: absolute;
	right: 12px;
	top: 12px;
}

.m-dialog .m-dialog-content .m-dialog-close button {
	cursor: pointer;
	appearance: none;
	border: none;
	background: transparent;
	font-size: 1.5rem;
}

.m-dialog .m-dialog-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;

	margin-top: 38px;
	padding-top: 20px;
	border-top: 1px solid #aaa;
}

.m-dialog .m-dialog-footer .m-button-group {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row-reverse;
}

.m-dialog .m-dialog-footer .m-button-group .m-button-secondary {
	margin-right: 10px;
}

.asterisk {
	color: red;
}

.m-dialog.m-main-dialog .m-dialog-body {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: repeat(2, auto);
	grid-template-areas:
		"section1 section2"
		"section3 section3";
	column-gap: 30px;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section.section-1 {
	grid-area: section1;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section.section-2 {
	grid-area: section2;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section.section-3 {
	grid-area: section3;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-input-emp-id {
	width: 40%;
	margin-right: 6px;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-input-emp-name {
	flex-grow: 1;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section select[name="emp-organization"] {
	width: 100%;
	height: var(--input-height);
	border: 1px solid #babec5;
	outline: none;
	border-radius: 2px;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section select[name="emp-organization"]:focus {
	border-color: var(--primary-color);
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-input-emp-dob {
	width: 40%;
	margin-right: 6px;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-checkbox-emp-gender {
	width: 100%;
	height: var(--input-height);
	display: flex;
	align-items: center;
}

.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-input-emp-identification-number {
	flex-grow: 1;
}
.m-dialog.m-main-dialog .m-dialog-body .m-dialog-body-section .m-row-input-emp-identification-number-release-date {
	margin-left: 6px;
	width: 40%;
}

.m-row-phone-and-email,
.m-row-bank-info {
	column-gap: 6px;
}
.m-row-phone-and-email .m-row-input,
.m-row-bank-info .m-row-input {
	flex-grow: 1;
}

.m-row.m-row-input {
	margin-bottom: 12px;
}

.m-row.m-row-input .m-input-label {
	margin: 0 0 4px 0;
	font-size: 12px;
	color: #111;
}

.m-checkbox + label {
	margin-right: 20px;
	margin-left: 10px;
}

/* main dialog additional styles  (maybe need or not) */
.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon,
.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	background-image: url(../../assets/img/Sprites.64af8f61.svg);
	background-repeat: no-repeat;
	background-position: -592px -456px;
	width: 24px;
	height: 24px;
	min-width: 24px;
	min-height: 24px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-help-icon {
	background-position: -89px -144px;
}

.m-dialog .m-dialog-content .m-dialog-close .m-button-cancel-icon {
	background-position: -144px -144px;
}

/* end of initial style */

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

.m-select-wrapper {
	width: 100%;
}

.m-row-input input.invalid,
.m-row-input select.invalid,
.m-row-input textarea.invalid,
.m-row-input .m-select-wrapper.invalid input {
	border: 1px solid red !important;
}

.m-row-input input:hover ~ .m-input-error-label.invalid,
.m-row-input select:hover ~ .m-input-error-label.invalid,
.m-row-input textarea:hover ~ .m-input-error-label.invalid,
.m-row-input .m-select-wrapper:hover ~ .m-input-error-label.invalid {
	display: block;
}
</style>
