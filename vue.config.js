/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-06 19:45:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-06 21:48:45
 * @FilePath: \anime1d:\Projects\flange-preview\vue.config.js
 */
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/flangeApi": {
        target: "http://127.0.0.1:9999/Spring_ssm/flange",
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/flangeApi": "",
        },
      },
      "/customerApi": {
        target: "http://127.0.0.1:9999/Spring_ssm/customer",
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/customerApi": "",
        },
      },
    },
  },
});
