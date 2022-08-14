import { createRouter, createWebHistory , RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	// {
	// 	path: "/",
	// 	name: "home",
	// 	component: UserPage,
	// },
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},
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
];

const router = createRouter({
	history: createWebHistory (),
	routes,
	linkExactActiveClass: "item-activated",
});

export default router;
