export default interface PaginationResponse<T> {
	/// Danh sách entity
	data: T[];

	/// Tổng số bản ghi khi chưa phân trang
	totalCount: number;

	/// Số item/trang
	pageSize: number;

	/// Trang hiện tại (tính từ 1)
	currentPage: number;

	/// Tổng số trang
	totalPages: number;

	/// Có thể nhảy về trang trước không
	hasPrevious: boolean;

	/// Có thể nhảy đến trang tiếp theo không
	hasNext: boolean;

	/// số thứ tự của bản ghi bắt đầu
	recordStart: number;

	/// số thứ tự bản ghi kết thúc
	recordEnd: number;
}
