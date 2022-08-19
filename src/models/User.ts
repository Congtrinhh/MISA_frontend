import { Status } from "@/enums/Status";
import BaseEntity from "./BaseEntity";
import Department from "./Department";
import Position from "./Position";
import Role  from "./Role";

export default class User extends BaseEntity {
	constructor() {
		super();
		this.userId = -1;
		this.userCode = "";
		this.fullName = "";
		this.status = Status.NotActivated;
		this.roles = new Array<Role>(); // cần khởi tạo tránh lỗi null
	}
	/// Khoá chính
	userId: number;

	/// Mã người dùng (dùng để hiển thị)
	userCode: string;

	/// Tên người dùng
	fullName: string;

	/// Địa chỉ email
	email?: string | undefined;

	/// Trạng thái người dùng
	status: Status;

	/// Phòng ban
	department?: Department | undefined;

	/// Vị trí công việc
	position?: Position | undefined;

	/// Các vai trò
	roles?: Role[] | undefined;

	/// Tên phòng ban (chỉ dùng cho việc hiển thị)
	departmentName?: string | undefined;

	/// Tên vị trí công việc (chỉ dùng cho việc hiển thị)
	positionName?: string | undefined;

	/// Danh sách tên vai trò được ngăn cách bởi dấu "," (cho việc hiển thị)
	roleNames?: string | undefined;

	/// Id phòng ban (cho việc thêm/cập nhật - vì không thể truyền cả object Department vào Dapper)
	departmentId?: number | undefined;

	/// Id vị trí công việc (cho việc thêm/cập nhật - vì không thể truyền cả object Positions vào Dapper)
	positionId?: number | undefined;
}
