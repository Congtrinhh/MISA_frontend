const apiUrls = {
	employee: "https://localhost:7247/api/v1/Employees",
	department: "https://localhost:7247/api/v1/Departments",
	position: "https://localhost:7247/api/v1/Positions",
};

class FormModeEnum {
	static add = new FormModeEnum("add");
	static update = new FormModeEnum("update");
	constructor(name) {
		this.name = name;
	}
}

const genders = {
	male: {
		text: "Nam",
		value: 1,
	},
	female: {
		text: "Nữ",
		value: 0,
	},
	other: {
		text: "Khác",
		value: 2,
	},
};

const errorValidationMessageEmployee = {
	employeeCode: {
		required: "Mã nhân viên không được trống",
	},
	fullName: {
		required: "Tên nhân viên không được trống",
	},
	departmentId: { required: "Mã đơn vị không được trống" },
	email: {
		required: "Email không được trống",
		format: "Email không hợp lệ",
	},
	common: {
		required: "Vui lòng nhập trường này",
	},
};

const pagingConfig = {
	pageSize: 20,
};
export { apiUrls, FormModeEnum, genders, errorValidationMessageEmployee, pagingConfig };
