/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 22:45:39
 * @LastEditors: PlanC14 planc2333@outlook.com
 * @LastEditTime: 2022-08-05 22:55:00
 * @FilePath: \flange-preview\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import HomeMView from "../views/HomeMView.vue";
import OrderView from "../views/OrderView.vue";
import BulkOrderView from "../views/BulkOrderView.vue";

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

export default router;
