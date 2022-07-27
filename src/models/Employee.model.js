/**
 * Class chứa thông tin đối tượng nhân viên
 * Created by TQCONG 28/6/22
 */
export default class Employee {
	constructor(
		EmployeeId,
		EmployeeCode,
		FullName,
		DepartmentId,
		PositionName,
		DateOfBirth,
		Gender,
		IdentityNumber,
		IdentityDate,
		IdentityPlace,
		Address,
		PhoneNumber,
		Email,
		BankAccountNumber,
		BankName,
		BankBranchName
	) {
		this.EmployeeId = EmployeeId;
		this.EmployeeCode = EmployeeCode;
		this.FullName = FullName;
		this.DepartmentId = DepartmentId;
		this.PositionName = PositionName;
		this.DateOfBirth = DateOfBirth;
		this.Gender = Gender;
		this.IdentityNumber = IdentityNumber;
		this.IdentityDate = IdentityDate;
		this.IdentityPlace = IdentityPlace;
		this.Address = Address;
		this.PhoneNumber = PhoneNumber;
		this.Email = Email;
		this.BankAccountNumber = BankAccountNumber;
		this.BankName = BankName;
		this.BankBranchName = BankBranchName;
	}
}
