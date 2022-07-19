import EmployeeService from "./EmployeeService.js";
import DepartmentService from "./DepartmentService.js";
import PositionService from "./PositionService.js";

const services = {
	employees: EmployeeService,
	departments: DepartmentService,
	positions: PositionService,
};

const ServiceFactory = {
	get: (name) => services[name],
};

export default ServiceFactory;
