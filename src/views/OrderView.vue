<!--
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-06-20 18:47:18
 * @LastEditors: PlanC14 planc2333@outlook.com
 * @LastEditTime: 2022-06-20 20:57:58
 * @FilePath: \flange-preview\src\views\orderView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <router-link to="/">
      <el-button
        type="primary"
        size="large"
        style="position: absolute; right: 0; bottom: 0; z-index: 1"
      >
        返回首页
      </el-button>
    </router-link>
    <el-table
      :data="orders"
      style="position: absolute; width: 100%; height: 100%; left: 0; top: 0"
      border
      stripe
      height="250"
      v-loading="loading"
    >
      <el-table-column label="订单列表">
        <el-table-column label="数量" prop="amount"></el-table-column>
        <el-table-column label="买家" prop="buyer"></el-table-column>
        <el-table-column label="中心半径" prop="centerRadius"></el-table-column>
        <el-table-column label="联系方式" prop="contact"></el-table-column>
        <el-table-column label="法兰半径" prop="flangeRadius"></el-table-column>
        <el-table-column
          label="法兰厚度"
          prop="flangeThickness"
        ></el-table-column>
        <el-table-column label="挖孔数" prop="holes"></el-table-column>
        <el-table-column label="挖孔间距" prop="holesPadding"></el-table-column>
        <el-table-column label="挖孔半径" prop="holesRadius"></el-table-column>
        <el-table-column label="颈底半径" prop="neckBottom"></el-table-column>
        <el-table-column label="颈顶半径" prop="neckTop"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      orders: [],
      loading: true,
    };
  },
  mounted: function () {
    axios.get("api/getAllOrder").then((response) => {
      this.orders = response.data;
      this.loading = false;
    });
  },
};
</script>
