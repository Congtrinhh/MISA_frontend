import Repository from "./Repository.js";
const resource = "/Departments";

export default {
	/**
	 * lấy ra danh sách phòng ban kèm theo thông tin phân trang
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
	 * lấy ra phòng ban dựa vào id
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id của phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả phòng ban
	 * author: Trinh Quy Cong - 21/7/22
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getAll: function () {
		return Repository.get(`${resource}`);
	},

	/**
	 * tạo phòng ban
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {phòng ban cần tạo} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	createDepartment: function (department) {
		return Repository.post(`${resource}`, department);
	},

	/**
	 * sửa phòng ban
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {phòng ban cần sửa} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	updateDepartment: function (department) {
		return Repository.put(`${resource}`, department);
	},

	/**
	 * xoá phòng ban
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	deleteDepartment: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},
};
