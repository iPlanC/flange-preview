<template>
  <div>
    <el-button
      type="primary"
      @click="downloadTemplate"
      style="display: inline-block; position: absolute; right: 50%"
    >
      下载批量模板
      <el-icon class="el-icon--right"><Bottom /></el-icon>
    </el-button>
    <el-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="upload"
      :show-file-list="false"
      accept=".xlsx"
      style="width: 100px; display: inline-block; position: absolute; left: 50%"
    >
      <el-button type="success">
        <el-icon class="el-icon--left"><Top /></el-icon>
        上传批量订单
      </el-button>
    </el-upload>
    <el-table
      :data="flanges"
      style="
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: -1;
      "
      border
      stripe
      height="250"
    >
      <el-table-column label="订单列表">
        <el-table-column label="挖孔数" prop="holes"></el-table-column>
        <el-table-column label="挖孔间距" prop="holesPadding"></el-table-column>
        <el-table-column label="法兰材质" prop="material"></el-table-column>
        <el-table-column
          label="法兰厚度"
          prop="flangeThickness"
        ></el-table-column>
        <el-table-column label="法兰半径" prop="flangeRadius"></el-table-column>
        <el-table-column label="挖孔半径" prop="holesRadius"></el-table-column>
        <el-table-column label="中心半径" prop="centerRadius"></el-table-column>
        <el-table-column label="颈底半径" prop="neckBottom"></el-table-column>
        <el-table-column label="颈顶半径" prop="neckTop"></el-table-column>
        <el-table-column label="联系方式" prop="contact"></el-table-column>
        <el-table-column label="订购数量" prop="amount"></el-table-column>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      @click="order"
      style="position: absolute; right: 0; top: 0; margin: 2px"
    >
      立即下单
    </el-button>
  </div>
</template>

<script>
import { read, utils } from "xlsx";
import axios from "axios";

export default {
  data: function () {
    return {
      flanges: [],
      flange: {
        holes: 4,
        holesPadding: 2.25,
        flangeRadius: 3,
        flangeThickness: 0.5,
        material: "塑料",
        holesRadius: 0.25,
        centerRadius: 0.5,
        neckBottom: 1.5,
        neckTop: 1,
        neckHeight: 1,
        segments: 16,
        contact: "12345678910",
        amount: 1,
        detail: "",
        buyer: "",
        buyer_identifier: "",
      },
    };
  },
  methods: {
    downloadTemplate: function () {
      let dom = document.createElement("a");
      dom.href = "importTemplate.xlsx";
      dom.download = "导入表模板.xlsx";
      document.body.appendChild(dom);
      dom.click();
      document.body.removeChild(dom);
    },
    upload: function (file) {
      let files = { 0: file };
      this.parseExcel(files);
    },
    parseExcel: function (files) {
      var that = this;
      this.falnges = [];
      if (files.length <= 0) {
        return;
      }
      if (!/\.xlsx$/.test(files[0].name.toLowerCase())) {
        this.$Message.error("上传格式不正确，请上传xlsx格式");
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0];
          const ws = utils.sheet_to_json(workbook.Sheets[wsname]);
          ws.forEach(function (item, index) {
            if (index == 0) return;
            that.flange.holes = item.holes;
            that.flange.holesPadding = item.holesPadding;
            that.flange.flangeRadius = item.flangeRadius;
            that.flange.flangeThickness = item.flangeThickness;
            that.flange.material = item.material;
            that.flange.holesRadius = item.holesRadius;
            that.flange.centerRadius = item.centerRadius;
            that.flange.neckBottom = item.neckBottom;
            that.flange.neckTop = item.neckTop;
            that.flange.neckHeight = item.neckHeight;
            that.flange.contact = item.contact;
            that.flange.amount = item.amount;
            that.flange.buyer = JSON.parse(
              window.sessionStorage.getItem("customer")
            ).username;
            that.flange.buyer_identifier = JSON.parse(
              window.sessionStorage.getItem("customer")
            ).identifier;
            that.flanges.push(item);
            // that.order(that.flange);
          });
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },
    order: function () {
      var that = this;
      this.$message({
        showClose: true,
        message: "下单中",
        type: "info",
      });
      this.flanges.forEach(function (item) {
        item.buyer = JSON.parse(
          window.sessionStorage.getItem("customer")
        ).username;
        item.buyer_identifier = JSON.parse(
          window.sessionStorage.getItem("customer")
        ).identifier;
        var link = "/php/createOrder.php";
        axios.post(link, item).then(
          () => {
            that.$message({
              showClose: true,
              message: "下单成功",
              type: "success",
            });
          },
          () => {
            that.$message({
              showClose: true,
              message: "下单失败",
              type: "error",
            });
          }
        );
      });
      this.$router.push("/orders");
    },
  },
  mounted: function () {
    if (window.sessionStorage.getItem("customer") == null) {
      this.$router.push("/");
    }
  },
};
</script>

<style></style>
