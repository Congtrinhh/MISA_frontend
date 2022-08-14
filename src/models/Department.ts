import BaseEntity from "./BaseEntity";

export default class Department extends BaseEntity {
	constructor() {
		super();
		this._departmentId = -1;
		this._description = "";
		this._name = "";
	}
	/// Khoá chính
	private _departmentId: number;
	public get departmentId(): number {
		return this._departmentId;
	}
	public set departmentId(value: number) {
		this._departmentId = value;
	}

	/// Tên phòng ban
	private _name: string;
	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}

	/// Mô tả
	private _description: string;
	public get description(): string {
		return this._description;
	}
	public set description(value: string) {
		this._description = value;
	}
}
