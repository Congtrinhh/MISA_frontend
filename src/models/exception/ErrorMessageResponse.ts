/**
 * Class chứa response lỗi từ server gửi về
 * author TQCONG 19/8/2022
 */
export default class ErrorMessageResponse {
	constructor() {
		this._userMsg = "";
		this._devMsg = "";
		this._errorCode = -1;
		this._traceId = -1;
		this._data = [];
	}
	/// message for user
	private _userMsg: string;
	public get userMsg(): string {
		return this._userMsg;
	}
	public set userMsg(value: string) {
		this._userMsg = value;
	}

	/// message for developer
	private _devMsg: string;
	public get devMsg(): string {
		return this._devMsg;
	}
	public set devMsg(value: string) {
		this._devMsg = value;
	}

	/// internal error code - for MISA
	private _errorCode: number;
	public get errorCode(): number {
		return this._errorCode;
	}
	public set errorCode(value: number) {
		this._errorCode = value;
	}

	/// id of error in the log file
	private _traceId: number;
	public get traceId(): number {
		return this._traceId;
	}
	public set traceId(value: number) {
		this._traceId = value;
	}

	/// contains details of errors
	private _data: string[];
	public get data(): string[] {
		return this._data;
	}
	public set data(value: string[]) {
		this._data = value;
	}
}
