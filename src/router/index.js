import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrderView from "../views/OrderView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrderView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
