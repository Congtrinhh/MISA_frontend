import Repository from "./Repository.js";
const resource = "/Positions";

export default {
	getPaging: function (pageIndex, pageSize, keyword) {
		return Repository.get(`${resource}?pageIndex=${pageIndex}&size=${pageSize}&keyword=${keyword}`);
	},

	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	getAll: function () {
		return Repository.get(`${resource}`);
	},

	createPosition: function (position) {
		return Repository.post(`${resource}`, position);
	},

	updatePosition: function (position) {
		return Repository.put(`${resource}`, position);
	},

	deletePosition: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},
};
