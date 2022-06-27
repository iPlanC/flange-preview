/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 22:45:39
 * @LastEditors: PlanC14 planc2333@outlook.com
 * @LastEditTime: 2022-06-27 15:16:24
 * @FilePath: \flange-preview\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
