import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";

import './css/base.css';
import "./css/variables.css";
import "./css/layout.css";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios; //set axios as default $http

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
