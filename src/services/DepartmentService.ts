import Department from "@/models/Department";
import Repository from "./Repository";
const resource = "/Departments";

export default {
	/**
	 * Lấy ra phòng ban dựa vào id
	 * @param {id của phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * Lấy ra tất cả phòng ban
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},

	/**
	 * Tạo phòng ban
	 * @param {phòng ban cần tạo} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	createDepartment: function (department: Department) {
		return Repository.post(`${resource}`, department);
	},

	/**
	 * Sửa phòng ban
	 * @param {phòng ban cần sửa} department
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	updateDepartment: function (department: Department) {
		return Repository.put(`${resource}`, department);
	},

	/**
	 * Xoá phòng ban
	 * @param {id phòng ban} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	deleteDepartment: function (id: number) {
		return Repository.delete(`${resource}/${id}`);
	},
};
