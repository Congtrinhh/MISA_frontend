import Repository from "./Repository.js";
const resource = "/Positions";

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
	 * lấy ra chức vụ dựa vào id
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id của chức vụ} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả chức vụ
	 * author: Trinh Quy Cong - 21/7/22
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	getAll: function () {
		return Repository.get(`${resource}`);
	},

	/**
	 * tạo chức vụ
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {chức vụ cần tạo} position
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	createPosition: function (position) {
		return Repository.post(`${resource}`, position);
	},

	/**
	 * update chức vụ
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {chức vụ cần update} position
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	updatePosition: function (position) {
		return Repository.put(`${resource}`, position);
	},

	/**
	 * xoá chức vụ
	 * author: Trinh Quy Cong - 21/7/22
	 * @param {id chức vụ} id
	 * @returns Promise chứa data để tiếp tục xử lý
	 */
	deletePosition: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},
};
