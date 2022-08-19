import PaginationResponse from "@/models/paging/PaginationResponse";
import UserPaginationRequest from "@/models/paging/UserPaginationRequest";
import User from "@/models/User";
import Repository from "./Repository";
const resource = "/Users";

export default {
	/**
	 * lấy ra danh sách user theo trang và lọc
	 * @param paginationRequest
	 * @returns
	 */
	getPaging: function (paginationRequest: UserPaginationRequest): Promise<PaginationResponse<User>> {
		return Repository.get(
			`${resource}?currentPage=${paginationRequest.currentPage}&pageSize=${paginationRequest.pageSize}&roleId=${paginationRequest.roleId}&fullName=${paginationRequest.fullName}`
		);
	},

	/**
	 *
	 * @returns
	 */
	getNewUserCode: function () {
		return Repository.get(`${resource}/newUserCode`);
	},

	/**
	 * tạo nhiều user
	 * @param users
	 * @returns
	 */
	createMany: function (users: User[]) {
		return Repository.post(`${resource}/many`, users);
	},

	/**
	 * lấy ra user theo id
	 * @param id
	 * @returns
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả user trong DB
	 * @returns
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},

	/**
	 * cập nhật user
	 * @param user
	 * @returns
	 */
	updateUser: function (user: User) {
		return Repository.put(`${resource}/${user.userId}`, user);
	},

	/**
	 * xoá user
	 * @param id
	 * @returns
	 */
	deleteUser: function (id: number) {
		return Repository.delete(`${resource}/${id}`);
	},
};
