import Repository from "./Repository.js";
const resource = "/Employees";

export default {
	getPaging: function (pageIndex, pageSize, keyword) {
		return Repository.get(`${resource}?pageIndex=${pageIndex}&size=${pageSize}&keyword=${keyword}`);
	},

	getById: function (id) {
		return Repository.get(`${resource}/${id}`);
	},

	getNewEmployeeCode: function () {
		return Repository.get(`${resource}/newEmployeeCode`);
	},

	getAll: function () {
		return Repository.get(`${resource}`);
	},

	createEmployee: function (employee) {
		return Repository.post(`${resource}`, employee);
	},

	updateEmployee: function (employee) {
		return Repository.put(`${resource}`, employee);
	},

	deleteEmployee: function (id) {
		return Repository.delete(`${resource}/${id}`);
	},

	deleteEmployees: function (listOfIds) {
		return Repository.delete(`${resource}`, { data: listOfIds });
	},
};
