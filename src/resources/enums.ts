// Style và tên tương ứng cho các trạng thái của user (để vẽ style html cho phần hiển thị trạng thái user)
export const UserStatus = {
	notActivated: {
		text: "Chưa kích hoạt",
		color: "#02a3ec",
		value: 0,
	},

	pending: {
		text: "Chờ xác nhận",
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


// object chứa các trường của bảng người dùng - dùng cho pop up để cấu hình ẩn/hiện cột nào của bảng người dùng
export const popupTableConfigFields = {
	userCode: {
		text: "Mã nhân viên",
		visible: true,
		locked: true,
	},
	fullName: {
		text: "Họ và tên",
		visible: true,
		locked: true,
	},
	departmentName: {
		text: "Phòng ban",
		visible: true,
	},
	positionName: {
		text: "Vị trí công việc",
		visible: true,
	},
	email: {
		text: "Email",
		visible: true,
	},
	roleNames: {
		text: "Vai trò",
		visible: true,
	},
	status: {
		text: "Trạng thái",
		visible: true,
	},
};

// mảng các màu để chọn ngẫu nhiên cho từng user dựa trên thuật toán có trước
export const UserAvatarColor = [
	"#1DA9F4",
	"#5ED56D",
	"#FD632F",
	"#4386DF",
	"#84AF94", //gray
	"#FEC874",
	"#EB509E",
	"#7C70EE",
	"#39C5AB",
	"#E33C4D",
];

