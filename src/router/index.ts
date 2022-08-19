import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/process/setting/user",
		name: "user-setting",
		component: () => import("../views/setup/user/UserPage.vue"),
	},
	{
		path: "/process/setting/role",
		name: "role-setting",
		component: () => import("../views/setup/role/RolePage.vue"),
	},
	{
		path: "/",
		redirect: "/process/setting/user",
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkExactActiveClass: "item-activated",
});

export default router;
