import PaginationResponse from "@/models/paging/PaginationResponse";
import UserPaginationRequest from "@/models/paging/UserPaginationRequest";
import User from "@/models/User";
import Repository from "./Repository";
const resource = "/Users";

export default {
	/**
	 * lấy ra danh sách user theo trang và lọc
	 * @param paginationRequest đối tượng request phân trang và lọc
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	getPaging: function (paginationRequest: UserPaginationRequest): Promise<PaginationResponse<User>> {
		return Repository.get(
			`${resource}?currentPage=${paginationRequest.currentPage}&pageSize=${paginationRequest.pageSize}&roleId=${paginationRequest.roleId}&keyword=${paginationRequest.keyword}`
		);
	},

	/**
	 * lấy ra mã user code mới
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	getNewUserCode: function () {
		return Repository.get(`${resource}/newUserCode`);
	},

	/**
	 * tạo nhiều user
	 * @param users
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	createMany: function (users: User[]) {
		return Repository.post(`${resource}/many`, users);
	},

	/**
	 * lấy ra user theo id
	 * @param id
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	getById: function (id: number) {
		return Repository.get(`${resource}/${id}`);
	},

	/**
	 * lấy ra tất cả user trong DB
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	getAll: function () {
		return Repository.get(`${resource}/all`);
	},

	/**
	 * cập nhật user
	 * @param user
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	updateUser: function (user: User) {
		return Repository.put(`${resource}/${user.userId}`, user);
	},

	/**
	 * xoá user
	 * @param id
	 * @returns axios Promise để tiếp tục xử lý
	 * author TQCONG 14/8/2022
	 */
	deleteUser: function (id: number) {
		return Repository.delete(`${resource}/${id}`);
	},
};
