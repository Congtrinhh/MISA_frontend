export enum Status {
	/// <summary>
	///  Chưa được kích hoạt
	/// </summary>
	NotActivated = 0,

	/// <summary>
	/// Chờ kích hoạt
	/// </summary>
	Pending = 1,

	/// <summary>
	/// Đang hoạt động
	/// </summary>
	Active = 2,

	/// <summary>
	/// Đã bị huỷ kích hoạt
	/// </summary>
	Deactivated = 3,
}
