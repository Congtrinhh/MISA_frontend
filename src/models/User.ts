import { Status } from "@/enums/Status";
import BaseEntity from "./BaseEntity";
import Department from "./Department";
import Position from "./Position";
import Role  from "./Role";

export default class User extends BaseEntity {
	constructor() {
		super();
		this._userId = -1;
		this._userCode = "";
		this._fullName = "";
		this._status = Status.NotActivated;
		this._roles = new Array<Role>(); // cần khởi tạo tránh lỗi null
	}
	/// Khoá chính
	private _userId: number;
	public get userId(): number {
		return this._userId;
	}
	public set userId(value: number) {
		this._userId = value;
	}

	/// Mã người dùng (dùng để hiển thị)
	private _userCode: string;
	public get userCode(): string {
		return this._userCode;
	}
	public set userCode(value: string) {
		this._userCode = value;
	}

	/// Tên người dùng
	private _fullName: string;
	public get fullName(): string {
		return this._fullName;
	}
	public set fullName(value: string) {
		this._fullName = value;
	}

	/// Địa chỉ email
	private _email?: string | undefined;
	public get email(): string | undefined {
		return this._email;
	}
	public set email(value: string | undefined) {
		this._email = value;
	}

	/// Trạng thái người dùng
	private _status: Status;
	public get status(): Status {
		return this._status;
	}
	public set status(value: Status) {
		this._status = value;
	}

	/// Phòng ban
	private _department?: Department | undefined;
	public get department(): Department | undefined {
		return this._department;
	}
	public set department(value: Department | undefined) {
		this._department = value;
	}

	/// Vị trí công việc
	private _position?: Position | undefined;
	public get position(): Position | undefined {
		return this._position;
	}
	public set position(value: Position | undefined) {
		this._position = value;
	}

	/// Các vai trò
	private _roles?: Role[] | undefined;
	public get roles(): Role[] | undefined {
		return this._roles;
	}
	public set roles(value: Role[] | undefined) {
		this._roles = value;
	}

	/// Tên phòng ban (chỉ dùng cho việc hiển thị)
	private _departmentName?: string | undefined;
	public get departmentName(): string | undefined {
		return this._departmentName;
	}
	public set departmentName(value: string | undefined) {
		this._departmentName = value;
	}

	/// Tên vị trí công việc (chỉ dùng cho việc hiển thị)
	private _positionName?: string | undefined;
	public get positionName(): string | undefined {
		return this._positionName;
	}
	public set positionName(value: string | undefined) {
		this._positionName = value;
	}

	/// Danh sách tên vai trò được ngăn cách bởi dấu "," (cho việc hiển thị)
	private _roleNames?: string | undefined;
	public get roleNames(): string | undefined {
		return this._roleNames;
	}
	public set roleNames(value: string | undefined) {
		this._roleNames = value;
	}

	/// Id phòng ban (cho việc thêm/cập nhật - vì không thể truyền cả object Department vào Dapper)
	private _departmentId?: number | undefined;
	public get departmentId(): number | undefined {
		return this._departmentId;
	}
	public set departmentId(value: number | undefined) {
		this._departmentId = value;
	}

	/// Id vị trí công việc (cho việc thêm/cập nhật - vì không thể truyền cả object Positions vào Dapper)
	private _positionId?: number | undefined;
	public get positionId(): number | undefined {
		return this._positionId;
	}
	public set positionId(value: number | undefined) {
		this._positionId = value;
	}
}
