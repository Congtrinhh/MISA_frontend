import Vue from "vue";
import VueRouter from "vue-router";
import EmployeePage from "../views/employee/EmployeePage.vue";
import OverAllPage from "../views/overall/OverAllPage.vue";
import PurchasePage from "../views/purchase/PurchasePage.vue";
import CashPage from "../views/cash/CashPage.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: OverAllPage,
	},

	{
		path: "/employee",
		name: "employee",
		component: EmployeePage,
	},
	{
		path: "/overall",
		name: "overall",
		component: OverAllPage,
	},
	{
		path: "/purchase",
		name: "purchase",
		component: PurchasePage,
	},
	{
		path: "/cash",
		name: "cash",
		component: CashPage,
	},
];

const router = new VueRouter({
	routes,
	linkExactActiveClass: "active",
});

export default router;
