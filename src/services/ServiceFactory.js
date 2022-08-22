import UserService from "./UserService";
import DepartmentService from "./DepartmentService";
import PositionService from "./PositionService";
import RoleService from "./RoleService";

const services = {
	users: UserService,
	departments: DepartmentService,
	positions: PositionService,
	roles: RoleService,
};

// import và gọi hàm này ở file .vue như ví dụ sau:
// import ServiceFactory from "@/services/ServiceFactory";
// const RoleService: any = ServiceFactory.get("roles"); (đây là ví dụ file ts, file js tương tự)
const ServiceFactory = {
	get: (name) => services[name],
};

export default ServiceFactory;
