import BaseEntity from "./BaseEntity";

export default class Position extends BaseEntity {
	constructor() {
		super();
		this._positionId = -1;
		this._description = "";
		this._name = "";
	}
	/// Khoá chính
	private _positionId: number;
	public get positionId(): number {
		return this._positionId;
	}
	public set positionId(value: number) {
		this._positionId = value;
	}

	/// Tên vị trí công việc
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
