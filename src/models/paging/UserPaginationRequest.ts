import BasePaginationRequest from "./BasePaginationRequest";

export default class UserPaginationRequest extends BasePaginationRequest {
	constructor() {
		super();
		this._fullName = "";
		this._roleId = -1;
	}

	/// Tìm kiếm từ khoá trong họ tên
	private _fullName: string;
	public get fullName(): string {
		return this._fullName;
	}
	public set fullName(value: string) {
		this._fullName = value;
	}

	/// Tìm kiếm theo id vai trò
	private _roleId: number;
	public get roleId(): number {
		return this._roleId;
	}
	public set roleId(value: number) {
		this._roleId = value;
	}
}
