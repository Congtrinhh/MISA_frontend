/**
 * File tiện dụng chứa nhiều Enum để dùng cho toàn trang web
 * Author: TQCONG 2/7/22
 */

/**
 * Chế độ form của main dialog (thêm/sửa/xoá)
 * dùng để xác định xem form đang ở chế độ nào mà gọi API cho thích hợp
 * Created by TQCONG 22/6/22
 */
class FormModeEnum {
	static add = new FormModeEnum("add");
	static update = new FormModeEnum("update");
	static delete = new FormModeEnum("delete");
	constructor(name) {
		this.name = name;
	}
}

/**
 * Xác định xem người dùng bấm nút "cất" hay "cất và thêm" trong main dialog
 * Created by TQCONG 12/7/22
 */
const mainDialogSaveMode = {
	saveOnly: 0,
	saveAndNew: 1,
};

/**
 * Enum giới tính
 * Created by TQCONG 2/7/22
 */
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

/**
 * Mã lỗi cho employee
 * Created by TQCONG 10/7/22
 */
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

/**
 * Cấu hình phân trang mặc định (sau này lấy từ server về khi component vừa khởi tạo)
 * Created by TQCONG 10/7/22
 */
const pagingConfig = {
	pageSize: 20,
};

export { FormModeEnum, genders, errorValidationMessageEmployee, pagingConfig, mainDialogSaveMode };
