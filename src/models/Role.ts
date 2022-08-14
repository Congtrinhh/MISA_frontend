import BaseEntity from "./BaseEntity";

export default class Role extends BaseEntity {
	constructor() {
		super();
		this._roleId = -1;
		this._description = "";
		this._name = "";
	}

	/// Khoá chính
	private _roleId: number;
	public get roleId(): number {
		return this._roleId;
	}
	public set roleId(value: number) {
		this._roleId = value;
	}

	/// Tên vai trò
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
