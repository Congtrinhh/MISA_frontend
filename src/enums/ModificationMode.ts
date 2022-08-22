/**
 * enum trạng thái của đối tượng khi được đưa lên API
 * createdBy TQCONG 14/8/2022
 */
export enum ModificationMode {
	/// Không làm gì
	Nothing = 0,

	/// Dữ liệu sẽ được thêm mới vào database
	Insert = 1,

	/// Dữ liệu sẽ được loại bỏ khỏi database
	Remove = 2,

	/// Dữ liệu sẽ được cập nhật
	Update = 3,
}
