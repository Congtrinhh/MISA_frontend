import Repository from "./Repository.js";
const resource = "/Employees";

export default {
	/**
	 * Lấy ra danh sách employee kèm theo thông tin phân trang
	 * @param {chỉ số trang (bắt đầu từ 0)} pageIndex
	 * @param {số item/trang} pageSize
	 * @param {từ khoá tìm kiếm} keyword
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getPaging: function (pageIndex, pageSize, keyword) {
		return Repository.get(`${resource}?pageIndex=${pageIndex}&size=${pageSize}&keyword=${keyword}`);
	},

	/**
	 * Lấy ra employee dựa vào id
	 * @param {id của employee} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * Lấy ra mã employee code mới
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getNewEmployeeCode: function () {
		return Repository.get(`${resource}/newEmployeeCode`);
	},

	/**
	 * Lấy ra tất cả employee
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getAll: function () {
		return Repository.get(`${resource}`);
	},

	/**
	 * Tạo employee
	 * @param {employee cần tạo} employee
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	createEmployee: function (employee) {
		return Repository.post(`${resource}`, employee);
	},

	/**
	 * Update employee
	 * @param {employee cần update} employee
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	updateEmployee: function (employee) {
		return Repository.put(`${resource}`, employee);
	},

	/**
	 * Xoá employee
	 * @param {id của employee} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	deleteEmployee: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},

	/**
	 * Xoá nhiều employee
	 * @param {mảng các employee id} listOfIds
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	deleteEmployees: function (listOfIds) {
		return Repository.delete(`${resource}`, { data: listOfIds });
	},

	/**
	 * Lấy ra 1 file excel chứa tất cả các bản ghi employee từ database
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getExcelFile: function () {
		return Repository.get(`${resource}/export-excel`, {
			responseType: "blob",
		});
	},
};
