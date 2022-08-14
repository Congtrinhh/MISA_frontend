// Style và tên tương ứng cho các trạng thái của user (để vẽ style html cho phần hiển thị trạng thái user)
const UserStatus = {
	notActivated: {
		text: "Chưa kích hoạt",
		color: "#02a3ec",
		value: 0,
	},

	pending: {
		text: "Chờ kích hoạt",
		color: "rgb(243, 150, 25)",
		value: 1,
	},

	active: {
		text: "Đang hoạt động",
		color: "rgb(102, 209, 129)",
		value: 2,
	},

	deactivated: {
		text: "Ngừng kích hoạt",
		color: "rgb(97, 103, 103)",
		value: 3,
	},

	undefined: {
		text: "Không xác định",
		color: "black",
		value: null,
	},
};

// mảng các màu để chọn ngẫu nhiên cho từng user dựa trên thuật toán có trước
const UserAvatarColor = ["blue", "green", "orange", "aqua", "gray", "yellow", "pink", "purple", "green", "red"];

export { UserStatus, UserAvatarColor };
