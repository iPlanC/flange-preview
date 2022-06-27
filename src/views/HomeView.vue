<template>
  <div class="home">
    <div class="controls">
      <el-collapse>
        <el-collapse-item title="参数设置">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model.number="flange.holes">
                <template #prepend>孔数</template>
                <template #append>
                  <el-button-group>
                    <el-button @click="holesMinus" circle small> - </el-button>
                    <el-button @click="holesPlus" circle small> + </el-button>
                  </el-button-group>
                </template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input v-model.number="flange.holesPadding">
                <template #prepend>孔间距</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-input v-model.number="flange.material">
                <template #prepend>法兰材质</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model.number="flange.flangeThickness">
                <template #prepend>法兰厚度</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model.number="flange.flangeRadius">
                <template #prepend>法兰半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.holesRadius">
                <template #prepend>切孔半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.centerRadius">
                <template #prepend>切圆半径</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model.number="flange.neckbottom">
                <template #prepend>颈底半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.neckTop">
                <template #prepend>颈顶半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.neckHeight">
                <template #prepend>颈高</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model.number="flange.contact">
                <template #prepend>联系方式</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.amount">
                <template #prepend>订购数量</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="flange.buyer">
                <template #prepend>购买厂家</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-input v-model="flangeDescribeLanguage"></el-input>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <span
                >模型面数精度(精度越高边缘越平滑 但生成时间越长 默认16)</span
              >
              <el-slider
                v-model.number="flange.segments"
                :min="3"
                :max="128"
                show-input
              ></el-slider>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-button type="primary" @click="shareUrl" size="large">
                分享模型
              </el-button>
            </el-col>
            <el-col :span="4">
              <a href="http://127.0.0.1:9999/Spring_ssm">
                <el-button type="primary" @click="paramUpdate" size="large">
                  批量下单
                </el-button>
              </a>
            </el-col>
            <el-col :span="8">
              <el-button-group>
                <el-button type="primary" @click="paramUpdate" size="large">
                  生成模型
                </el-button>
                <el-button type="primary" @click="order" size="large">
                  立即下单
                </el-button>
              </el-button-group>
            </el-col>
            <el-col :span="4">
              <router-link to="/orders">
                <el-button type="primary" size="large"> 订单列表 </el-button>
              </router-link>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="copyright">
      <copyrightComponent />
    </div>
    <threeComponent ref="threeComponent" />
  </div>
</template>

<script>
// @ is an alias to /src
import threeComponent from "@/components/threeComponent.vue";
import copyrightComponent from "@/components/copyrightComponent.vue";
import useClipboard from "vue-clipboard3";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { read, utils } from "xlsx";

export default {
  name: "HomeView",
  components: {
    threeComponent,
    copyrightComponent,
  },
  data: function () {
    return {
      flangeDescribeLanguage: "",
      flange: {
        holes: 4,
        holesPadding: 2.25,
        flangeRadius: 3,
        flangeThickness: 0.5,
        material: "塑料",
        holesRadius: 0.25,
        centerRadius: 0.5,
        neckbottom: 1.5,
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
    holesMinus: function () {
      if (this.flange.holes > 0) {
        this.flange.holes--;
      }
    },
    holesPlus: function () {
      this.flange.holes++;
    },
    paramUpdate: function () {
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.modifyCylinder(this.flange.flangeRadius, this.flange.flangeRadius, this.flange.flangeThickness, this.flange.segments);
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.createMergedNeck(this.flange.neckbottom, this.flange.neckTop, this.flange.neckHeight, 0, (this.flange.flangeThickness + this.flange.neckHeight) / 2, 0, this.flange.segments);
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.createCutHole(this.flange.centerRadius, this.flange.neckHeight + this.flange.neckHeight + this.flange.flangeThickness, 0, 0, 0, this.flange.segments);
      // eslint-disable-next-line no-empty
      for (var i = 0; i < this.flange.holes; i++) {
        var angle = (360 / this.flange.holes) * i;
        // eslint-disable-next-line prettier/prettier
        this.$refs.threeComponent.createCutHole(this.flange.holesRadius, this.flange.flangeThickness, Math.sin((angle * Math.PI) / 180) * this.flange.holesPadding, 0, Math.cos((angle * Math.PI) / 180) * this.flange.holesPadding, this.flange.segments);
      }
      this.flangeDescribeLanguage =
        this.flange.holes +
        "/" +
        this.flange.holesPadding +
        "/" +
        this.flange.material +
        "/" +
        this.flange.flangeThickness +
        "/" +
        this.flange.flangeRadius +
        "/" +
        this.flange.holesRadius +
        "/" +
        this.flange.centerRadius +
        "/" +
        this.flange.neckbottom +
        "/" +
        this.flange.neckTop +
        "/" +
        this.flange.neckHeight;
    },
    shareUrl: function () {
      const { toClipboard } = useClipboard();
      const copy = async () => {
        var param = "";
        for (let key in this.flange) {
          param = param + key + "=" + this.flange[key] + "&";
        }
        param = window.location.href + "?" + param.slice(0, param.length - 1);
        await toClipboard(param);
        this.$message({
          message: "复制成功",
          type: "success",
        });
      };
      return copy();
    },
    cameraSet: function (x, y, z) {
      this.$refs.threeComponent.cameraSet(x, y, z);
    },
    order: function () {
      this.$message({
        showClose: true,
        message: "下单中",
        type: "info",
      });
      axios.post("flangeApi/saveFlange", this.flange).then(
        () => {
          this.$message({
            showClose: true,
            message: "下单成功",
            type: "success",
          });
        },
        () => {
          this.$message({
            showClose: true,
            message: "下单失败",
            type: "error",
          });
        }
      );
    },
    downloadTemplate: function () {
      let dom = document.createElement("a");
      dom.href = "导入表模板.xlsx";
      dom.download = "导入表模板.xlsx";
      document.body.appendChild(dom);
      // 点击下载
      dom.click();
      document.body.removeChild(dom);
    },
  },
  mounted: function () {
    if (window.sessionStorage.getItem("customer") == null) {
      this.$router.push("/");
    }
    // console.log(this.$route.query);
    if (JSON.stringify(this.$route.query) != "{}") {
      this.flange.holes = Number(this.$route.query.holes);
      this.flange.holesPadding = Number(this.$route.query.holesPadding);
      this.flange.flangeRadius = Number(this.$route.query.flangeRadius);
      this.flange.flangeThickness = Number(this.$route.query.flangeThickness);
      this.flange.flangeMaterial = this.$route.query.flangeMaterial;
      this.flange.holesRadius = Number(this.$route.query.holesRadius);
      this.flange.centerRadius = Number(this.$route.query.centerRadius);
      this.flange.neckbottom = Number(this.$route.query.neckbottom);
      this.flange.neckTop = Number(this.$route.query.neckTop);
      this.flange.neckHeight = Number(this.$route.query.neckHeight);
      this.flange.segments = Number(this.$route.query.segments);
      this.flange.contact = this.$route.query.contact;
      this.flange.amount = Number(this.$route.query.amount);
    }
    console.log(JSON.parse(window.sessionStorage.getItem("customer")));
    this.flange.buyer = JSON.parse(
      window.sessionStorage.getItem("customer")
    ).username;
    this.flange.buyer_identifier = JSON.parse(
      window.sessionStorage.getItem("customer")
    ).identifier;
    this.paramUpdate();
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100%;
}

.controls {
  min-width: 50%;
  max-width: 100%;
  height: 100%;
  background-color: gray;
  border-radius: 0.5em;
}

.el-row {
  padding: 5px 15px;
}

.demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.home .copyright {
  z-index: 100;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
  background-color: var(--el-color-bg-color-dark);
}

el-collapse-item :hover {
  background-color: red;
}
</style>
