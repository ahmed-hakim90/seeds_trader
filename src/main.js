import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import HtmlToPaper from "vue-html-to-paper";
import "@/scss/main.scss";
Vue.config.productionTip = false;

// const options = {
//   name: "_blank",
//   specs: ["fullscreen=yes", "titlebar=no", "scrollbars=no"],
//   styles: [
//     "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css",
//     "../src/scss/app.c1bc5b26.css",
//     "../src/scss/chunk-vendors.84272de6.css"
//   ]
// };

// Vue.use(HtmlToPaper, options);

// // or, using the defaults with no stylesheet

// Vue.use(HtmlToPaper);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
