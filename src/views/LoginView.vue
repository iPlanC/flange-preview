<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="loginView">
      <div class="buyerLogin">
        <el-input v-model.number="username">
          <template #prepend>账号</template>
        </el-input>
        <el-input v-model.number="password" show-password>
          <template #prepend>密码</template>
        </el-input>
        <el-button type="primary" size="large" v-on:click="login"
          >登录</el-button
        >
      </div>
    </div>
    <el-divider direction="vertical" />
    <div class="loginView">
      <div class="buyerLogin">
        <el-input v-model.number="username">
          <template #prepend>账号</template>
        </el-input>
        <el-input v-model.number="password" show-password>
          <template #prepend>密码</template>
        </el-input>
        <el-input v-model.number="passwordCheck" show-password>
          <template #prepend>重复密码</template>
        </el-input>
        <el-button type="primary" size="large" v-on:click="register"
          >注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data: function () {
    return {
      username: "某公司1",
      password: "1234561",
      passwordCheck: "1234561",
    };
  },
  methods: {
    login: function () {
      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      var link =
        process.env.NODE_ENV === "development"
          ? "customerApi/verify"
          : "http://localhost:8081/flange/customer/verify";
      axios.post(link, params).then((response) => {
        if (response.data != "") {
          this.$message({
            showClose: true,
            message: "登陆成功",
            type: "success",
          });
          window.sessionStorage.setItem(
            "customer",
            JSON.stringify(response.data)
          );
          this.$router.push("/home");
        } else {
          this.$message({
            showClose: true,
            message: "登陆失败",
            type: "error",
          });
        }
      });
    },
    register: function () {
      if (this.password == this.passwordCheck) {
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.password);
        var link =
          process.env.NODE_ENV === "development"
            ? "customerApi/register"
            : "http://localhost:8081/flange/customer/register";
        axios.post(link, params).then((response) => {
          if (response.data == "") {
            this.$message({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "注册失败",
              type: "error",
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "密码输入有误",
          type: "error",
        });
      }
    },
  },
  mounted: function () {
    if (window.sessionStorage.getItem("customer") != null) {
      this.$router.push("/home");
    }
  },
};
</script>

<style>
.loginView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loginView .buyerLogin {
  width: 20rem;
}

.loginView .buyerLogin .el-button {
  width: 20rem;
}
</style>
