/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 22:45:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-06 21:48:55
 * @FilePath: \anime1d:\Projects\flange-preview\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import * as ElIcons from "@element-plus/icons";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store).use(router).use(ElementPlus);
for (const each in ElIcons) {
  app.component(each, ElIcons[each]);
}

app.mount("#app");
