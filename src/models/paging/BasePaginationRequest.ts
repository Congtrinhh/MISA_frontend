export default class BasePaginationRequest {
	constructor() {
		this._currentPage = 1;
		this._pageSize = 15;
	}
	/// Trang cần lấy
	private _currentPage: number;
	public get currentPage(): number {
		return this._currentPage;
	}
	public set currentPage(value: number) {
		this._currentPage = value;
	}

	/// Số bản ghi/trang
	private _pageSize: number;
	public get pageSize(): number {
		return this._pageSize;
	}
	public set pageSize(value: number) {
		this._pageSize = value;
	}
}
