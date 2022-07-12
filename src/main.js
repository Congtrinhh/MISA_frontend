import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";

import ElementUI from "element-ui"; // full import
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi"; // locale for vietnamese (for pagination display vietnamese)

// global css
import "./css/base.css";
import "./css/variables.css";
import "./css/layout.css";

// customized css
import "./css/customize/pagination.css";
import "./css/customize/select.css";

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;
Vue.prototype.$http = Axios; //set axios as default $http

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
