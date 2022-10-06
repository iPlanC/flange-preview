/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 22:45:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-06 21:48:20
 * @FilePath: flange-preview\src\router\index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import HomeMView from "../views/HomeMView.vue";
import OrderView from "../views/OrderView.vue";
import BulkOrderView from "../views/BulkOrderView.vue";

import "nprogress/nprogress.css";

NProgress.configure({
  easing: "ease", // 动画方式
  showSpinner: true, // 是否显示加载ico
});

const routes = [
  {
    path: "/",
    name: "index",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/homeM",
    name: "homeM",
    component: HomeMView,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrderView,
  },
  {
    path: "/bulk",
    name: "bulk",
    component: BulkOrderView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
  console.log("beforeEach");
});

router.afterEach(() => {
  NProgress.done();
  console.log("afterEach");
});

export default router;
