import Repository from "./Repository.js";
const resource = "/Departments";

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

	createDepartment: function (department) {
		return Repository.post(`${resource}`, department);
	},

	updateDepartment: function (department) {
		return Repository.put(`${resource}`, department);
	},

	deleteDepartment: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},
};
