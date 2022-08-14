import Repository from "./Repository";
const resource = "/Roles";

export default {
	/**
	 * lấy ra role theo id
	 * @param id
	 * @returns
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả role trong DB
	 * @returns
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},
};
