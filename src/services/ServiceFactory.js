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

const ServiceFactory = {
	get: (name) => services[name],
};

export default ServiceFactory;
