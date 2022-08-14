import { ModificationMode } from "@/enums/ModificationMode";

export default class BaseEntity {
	constructor() {
		this._createdDate = new Date();
		this._modifiedDate = new Date();
		this._createdBy = "";
		this._modifiedBy = "";
		this._modificationMode = ModificationMode.Nothing;
	}

	// ngày tạo
	private _createdDate: Date;
	public get createdDate(): Date {
		return this._createdDate;
	}
	public set createdDate(value: Date) {
		this._createdDate = value;
	}

	/// Ngày sửa
	private _modifiedDate: Date;
	public get modifiedDate(): Date {
		return this._modifiedDate;
	}
	public set modifiedDate(value: Date) {
		this._modifiedDate = value;
	}

	/// Người tạo
	private _createdBy: string;
	public get createdBy(): string {
		return this._createdBy;
	}
	public set createdBy(value: string) {
		this._createdBy = value;
	}

	/// Người sửa
	private _modifiedBy: string;
	public get modifiedBy(): string {
		return this._modifiedBy;
	}
	public set modifiedBy(value: string) {
		this._modifiedBy = value;
	}

	/// Xác định xem sẽ làm gì với dữ liệu được gửi lên từ client
	private _modificationMode: ModificationMode;
	public get modificationMode(): ModificationMode {
		return this._modificationMode;
	}
	public set modificationMode(value: ModificationMode) {
		this._modificationMode = value;
	}
}
