import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue";
import Clients from "../views/Clients.vue";
import AccountClient from "../views/AccountClient.vue";
import Rebort from "../views/FullReport.vue";
import SeedRebort from "../views/seedReport.vue";
import Seeds from "../views/Seeds.vue";
import AuthGuard from "./auth-gaud";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: AuthGuard
  },

  {
    path: "/clients",
    name: "clients",
    component: Clients,
    beforeEnter: AuthGuard
  },
  {
    path: "/accountclient",
    name: "accountclient",
    component: AccountClient,
    beforeEnter: AuthGuard
  },
  {
    path: "/seeds",
    name: "seeds",
    component: Seeds,
    beforeEnter: AuthGuard
  },
  {
    path: "/fullReport",
    name: "fullReport",
    component: Rebort,
    beforeEnter: AuthGuard
  },

  {
    path: "/seedReport",
    name: "seedReport",
    component: SeedRebort,
    beforeEnter: AuthGuard
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
