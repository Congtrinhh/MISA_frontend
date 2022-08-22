import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/setting/user",
		name: "user-setting",
		component: () => import("../views/setup/user/UserPage/UserPage.vue"),
	},
	{
		path: "/setting/role",
		name: "role-setting",
		component: () => import("../views/setup/role/RolePage/RolePage.vue"),
	},
	{
		path: "/",
		redirect: "/setting/user",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: "item-activated",
});

export default router;
