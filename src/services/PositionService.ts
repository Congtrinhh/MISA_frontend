import Position from "@/models/Position";
import Repository from "./Repository";
const resource = "/Positions";

export default {
	/**
	 * Lấy ra chức vụ dựa vào id
	 * @param {id của chức vụ} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * Lấy ra tất cả chức vụ
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},

	/**
	 * Tạo chức vụ
	 * @param {chức vụ cần tạo} position
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	createPosition: function (position: Position) {
		return Repository.post(`${resource}`, position);
	},

	/**
	 * Update chức vụ
	 * @param {chức vụ cần update} position
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	updatePosition: function (position: Position) {
		return Repository.put(`${resource}`, position);
	},

	/**
	 * Xoá chức vụ
	 * @param {id chức vụ} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 * Author: TQCONG - 14/8/22
	 */
	deletePosition: function (id: number) {
		return Repository.delete(`${resource}/${id}`);
	},
};
