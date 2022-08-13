<template>
  <div>
    <router-link to="/home">
      <el-button
        type="primary"
        size="large"
        style="position: absolute; right: 0; top: 0; z-index: 10"
      >
        返回首页
      </el-button>
    </router-link>
    <el-table
      :data="filteredOrders"
      :default-sort="{ prop: 'amount', order: 'descending' }"
      table-layout="auto"
      style="position: absolute; width: 100%; height: 100%; left: 0; top: 0"
      border
      stripe
      height="250"
      v-loading="loading"
    >
      <el-table-column label="订单列表">
        <el-table-column label="买家" prop="buyer" sortable></el-table-column>
        <el-table-column label="买家唯一识别码" prop="buyer_identifier">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="买家唯一识别码"
              style="width: 16rem"
            />
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="amount" sortable></el-table-column>
        <el-table-column label="材质" prop="material"></el-table-column>
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
      search: "",
    };
  },
  computed: {
    filteredOrders: function () {
      return this.orders.filter((order) => {
        return (
          order.buyer_identifier.includes(this.search) ||
          order.buyer_identifier.startsWith(this.search) ||
          order.buyer_identifier.endsWith(this.search)
        );
      });
    },
  },
  mounted: function () {
    if (window.sessionStorage.getItem("customer") == null) {
      this.$router.push("/");
    }
    var link = "/php/getAllOrder.php";
    axios.get(link).then((response) => {
      this.orders = response.data;
      this.loading = false;
    });
  },
};
</script>
