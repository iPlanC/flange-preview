/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 22:45:39
 * @LastEditors: PlanC14 planc2333@outlook.com
 * @LastEditTime: 2022-06-20 19:21:51
 * @FilePath: \flange-preview\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9999/Spring_ssm/flange/",
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
