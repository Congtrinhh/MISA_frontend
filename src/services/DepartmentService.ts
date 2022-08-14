import Department from "@/models/Department";
import Repository from "./Repository";
const resource = "/Departments";

export default {
	/**
	 * Lấy ra danh sách phòng ban kèm theo thông tin phân trang
	 * @param {chỉ số trang (bắt đầu từ 0)} pageIndex
	 * @param {số item/trang} pageSize
	 * @param {từ khoá tìm kiếm} keyword
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	// getPaging: function (pageIndex, pageSize, keyword) {
	// 	return Repository.get(`${resource}?pageIndex=${pageIndex}&size=${pageSize}&keyword=${keyword}`);
	// },

	/**
	 * Lấy ra phòng ban dựa vào id
	 * @param {id của phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * Lấy ra tất cả phòng ban
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},

	/**
	 * Tạo phòng ban
	 * @param {phòng ban cần tạo} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	createDepartment: function (department: Department) {
		return Repository.post(`${resource}`, department);
	},

	/**
	 * Sửa phòng ban
	 * @param {phòng ban cần sửa} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	updateDepartment: function (department: Department) {
		return Repository.put(`${resource}`, department);
	},

	/**
	 * Xoá phòng ban
	 * @param {id phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 21/7/22
	 */
	deleteDepartment: function (id: number) {
		return Repository.delete(`${resource}/${id}`);
	},
};
