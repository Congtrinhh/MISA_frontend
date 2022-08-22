import { Status } from "@/enums/Status";
import User from "@/models/User";
import { UserAvatarColor, UserStatus } from "@/resources/enums";
// @ts-ignore
import { toNonAccentVietnamese } from "./nonAccentVietnamese";

/**
 * từ status của user, lấy ra thông tin chi tiết hơn về trạng thái đó
 * @param status trạng thái của user
 * @returns trạng thái có kèm màu sắc, text và giá trị
 * author TQCONG 14/8/2022
 */
export function getUserStatusStyles(status: Status): object {
	try {
		switch (status) {
			case Status.Active:
				return UserStatus.active;
				break;
			case Status.Deactivated:
				return UserStatus.deactivated;
				break;
			case Status.NotActivated:
				return UserStatus.notActivated;
				break;
			case Status.Pending:
				return UserStatus.pending;
				break;
			default:
				return UserStatus.undefined;
		}
	} catch (e) {
		console.log(e);
		return UserStatus.undefined;
	}
}

/**
 * tạo avatar cho user dựa vào tên
 * @param user đối tượng user cần tạo avatar
 * @param cssClasses css class đi kèm thêm (nếu muốn)
 * @returns thẻ div render ra avatar
 * author TQCONG 14/8/2022
 */
export function getUserAvatarMarkup(user: User, cssClasses: string=""): string {
	const defaultMarkup = `<div class="user-avatar ${cssClasses}" style="background-color: gray">--</div>`;
	try {
		let code = user.userCode; // có dạng NV-12145
		// lấy ra số cuối cùng của mã
		code = code.substring(code.length - 1);
		if (code) {
			const targetNumber = Number(code);
			// lấy ra màu theo số
			const color = UserAvatarColor[targetNumber];

			// build tên viết tắt. Trinh Quy Cong -> TC; Ngọc Ánh -> NA (chứ không phải NÁ)
			let firstName = toNonAccentVietnamese(user.fullName.substring(0, 1));
			let lastName = toNonAccentVietnamese( user.fullName.split(" ").pop()?.substring(0, 1) );
			const name = `${firstName}${lastName}`.toUpperCase();
			// build thẻ html
			const markup = `<div class="user-avatar ${cssClasses}" style="background-color: ${color}">${name}</div>`;
			return markup;
		}
		return defaultMarkup;
	} catch (error) {
		console.log(error);
		return defaultMarkup;
	}
}


/**
 * trả về chuỗi có các số 0 đằng trước để đủ 4 chữ số
 * @param num số chính (số mà có các số 0 đằng trước)
 * @param totalLength độ dài của chuỗi (tính cả số num)
 * @returns ví dụ: nhận vào: num=3, totalLength=4 => return 0003
 * author TQCONG 14/8/2022
 */
export function addLeadingZeros(num:number, totalLength:number=4) :string{
	return String(num).padStart(totalLength, "0");
}
