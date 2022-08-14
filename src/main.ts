import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// styles
import "devextreme/dist/css/dx.light.css";
import "./assets/css/global.scss";



createApp(App).use(store).use(router).mount("#app");
