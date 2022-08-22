import Repository from "./Repository";
const resource = "/Roles";

export default {
	/**
	 * lấy ra role theo id
	 * @param id
	 * @returns
	 * author TQCONG 14/8/2022
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả role trong DB
	 * @returns
	 * author TQCONG 14/8/2022
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},
};
