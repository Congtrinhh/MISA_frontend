import BasePaginationRequest from "./BasePaginationRequest";

/**
 * Class thông tin phân trang của user gửi lên server
 * author TQCONG 19/8/2022
 */
export default class UserPaginationRequest extends BasePaginationRequest {
	constructor() {
		super();
		this._keyword = "";
		this._roleId = -1;
	}

	/// Tìm kiếm từ khoá trong Mã, Họ tên, Phòng ban, vị trí, Email
	private _keyword: string;
	public get keyword(): string {
		return this._keyword;
	}
	public set keyword(value: string) {
		this._keyword = value;
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
