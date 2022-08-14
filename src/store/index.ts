import User from "@/models/User";
import { createStore } from "vuex";
// dùng để gọi API
// @ts-ignore
import ServiceFactory from "@/services/ServiceFactory";
const UserService: any = ServiceFactory.get("users");

export default createStore({
	state: {
		// đối tượng user của toàn app - dùng để thực hiện việc update/xoá
		user: new User(),

		// hiện màn hình thông tin chi tiết của user
		showUserDetailScreen: false,

		// hiện dialog cập nhật user
		showUserUpdateDialog: false,

		// bất kì danh sách entity nào cần lấy mới nhất từ DB. trong trường hợp này là user list
		needReload: false,
	},
	getters: {
		user: (state: any): User => state.user,
		showUserDetailScreen: (state: any): boolean => state.showUserDetailScreen,
		showUserUpdateDialog: (state: any): boolean => state.showUserUpdateDialog,
		needReload: (state: any): boolean => state.needReload,
	},
	mutations: {
		setUser(state, user: User): void {
			state.user = user;
		},
		setShowUserDetailScreen(state, showOrNot: boolean): void {
			state.showUserDetailScreen = showOrNot;
		},
		setShowUserUpdateDialog(state, showOrNot: boolean): void {
			state.showUserUpdateDialog = showOrNot;
		},
		setNeedReload(state, newValue: boolean): void {
			state.needReload = newValue;
		},
	},
	actions: {
		/**
		 * khi người dùng bấm vào nút "sửa" trên 1 dòng của bảng user
		 * @param context
		 * @param user
		 * author TQCONG 13/8/2022
		 */
		async handleShowUserUpdateDialog(context, user: User) {
			const rs = await UserService.getById(user.userId);
			const userFromDb = rs.data;
			if (userFromDb) {
				// set user mới
				context.commit("setUser", userFromDb);
				// mở dialog update user
				context.commit("setShowUserUpdateDialog", true);
			}
		},
		updateUser(context, user: User): void {
			context.commit("setUser", user);
		},
		/**
		 * xoá user sau khi ... (hàm này cần xem lại)
		 * @param context
		 * @param user
		 * author TQCONG 12/8/2022
		 */
		async deleteUser(context) {
			try {
				// call api to delete user
				const { data } = await UserService.deleteUser(context.state.user?.userId);
				if (data === 1) {
					// cập nhật user trong store nếu xoá thành công
					context.commit("setUser", new User());

					// ẩn màn hình chi tiết user nếu nút xoá được kích từ màn hình này (vì lúc này user đã bị xoá nên việc hiển thị màn hình chi tiết không còn ý nghĩa)
					context.commit("setShowUserDetailScreen", false);
				}
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * set user mới nhất khi kích vào 1 dòng của bảng user và
		 * hiện form chi tiết user
		 * @param context
		 * @param param1 giá trị nhận vào từ dx-column - trong đó data chính là user mới mà ta cần
		 * author TQCONG 12/8/2022
		 */
		async handleTableRowClick(context, { data }) {
			try {
				console.log("row clicked");
				// set user mới
				const rs = await UserService.getById(data.userId);
				context.commit("setUser", rs.data);
				// hiện màn hình chi tiết user
				context.commit("setShowUserDetailScreen", true);
			} catch (error) {
				console.log(error);
			}
		},

		/**
		 * đóng dialog update
		 * @param context
		 * author TQCONG 12/8/2022
		 */
		hideUserUpdateDialog(context): void {
			context.commit("setShowUserUpdateDialog", false);
		},

		/**
		 * cập nhật user và đóng dialog update (action nút "lưu" của dialog cập nhật được bấm)
		 * @param context
		 * author TQCONG 12/8/2022
		 */
		async handleUpdateUser(context, user) {
			const { data } = await UserService.updateUser(user);
			if (data === 1) {
				// thông báo thành công
				console.log("update thanh cong");

				// đóng dialog update
				context.commit("setShowUserUpdateDialog", false);

				// request để reload lại user list trong userList component
				context.commit("setNeedReload", true);

				const { data } = await UserService.getById(user.userId);
				if (!data) {
					return;
				}
				context.commit("setUser", data);
			}
		},
	},
	modules: {},
});
