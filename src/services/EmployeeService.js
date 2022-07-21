import Repository from "./Repository.js";
const resource = "/Employees";

export default {
	/**
	 * lấy ra danh sách employee kèm theo thông tin phân trang
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {chỉ số trang (bắt đầu từ 0)} pageIndex
	 * @param {số item/trang} pageSize
	 * @param {từ khoá tìm kiếm} keyword
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getPaging: function (pageIndex, pageSize, keyword) {
		return Repository.get(`${resource}?pageIndex=${pageIndex}&size=${pageSize}&keyword=${keyword}`);
	},

	/**
	 * lấy ra employee dựa vào id
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id của employee} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra mã employee code mới
	 * author: Trinh Quy Cong - 21/7/22
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getNewEmployeeCode: function () {
		return Repository.get(`${resource}/newEmployeeCode`);
	},

	/**
	 * lấy ra tất cả employee
	 * author: Trinh Quy Cong - 21/7/22
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getAll: function () {
		return Repository.get(`${resource}`);
	},

	/**
	 * tạo employee
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {employee cần tạo} employee
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	createEmployee: function (employee) {
		return Repository.post(`${resource}`, employee);
	},

	/**
	 * update employee
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {employee cần update} employee
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	updateEmployee: function (employee) {
		return Repository.put(`${resource}`, employee);
	},

	/**
	 * xoá employee
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id của employee} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	deleteEmployee: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},

	/**
	 * xoá nhiều employee
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {mảng các employee id} listOfIds
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	deleteEmployees: function (listOfIds) {
		return Repository.delete(`${resource}`, { data: listOfIds });
	},

	/**
	 * lấy ra 1 file excel chứa tất cả các bản ghi employee từ database
	 * author: Trinh Quy Cong - 21/7/22
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getExcelFile: function () {
		return Repository.get(`${resource}/export-excel`, {
			responseType: "blob",
		});
	},
};
