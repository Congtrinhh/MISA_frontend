import { Status } from "@/enums/Status";
import User from "@/models/User";
import { UserAvatarColor, UserStatus } from "@/resources/enums";

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

			// build tên viết tắt. Trinh Quy Cong -> TC
			let firstName = user.fullName.substring(0, 1);
			let lastName = user.fullName.split(" ").pop()?.substring(0, 1);
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
 */
export function addLeadingZeros(num:number, totalLength:number=4) :string{
	return String(num).padStart(totalLength, "0");
}
