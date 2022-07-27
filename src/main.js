import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import element ui - full import
import ElementUI from "element-ui/src";
import "element-ui/lib/theme-chalk/index.css";
// locale for vietnamese (for pagination display vietnamese)
import locale from "element-ui/lib/locale/lang/vi";


// global css
import "./css/base.css";
import "./css/variables.css";
import "./css/layout.css";
// customized css
import "./css/customize/pagination.css";
import "./css/customize/select.css";
import "./css/customize/date-picker.css";

// dùng element ui kèm config
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
