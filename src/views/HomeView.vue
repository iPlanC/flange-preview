<template>
  <div class="home">
    <div class="controls">
      <el-collapse v-model.number="param">
        <el-collapse-item title="参数设置" name="param">
          <el-row>
            <el-col :span="15">
              <el-input v-model.number="falange.holes">
                <template #prepend>孔数</template>
                <template #append>
                  <el-button-group>
                    <el-button @click="holesMinus" circle small>
                      <el-icon>
                        <svg
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                          data-v-78e17ca8=""
                        >
                          <path
                            fill="currentColor"
                            d="M128 544h768a16 16 0 1 0 0-16H128a16 16 0 0 0 0 16z"
                          ></path>
                        </svg>
                      </el-icon>
                    </el-button>
                    <el-button @click="holesPlus" circle small>
                      <el-icon>
                        <svg
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                          data-v-78e17ca8=""
                        >
                          <path
                            fill="currentColor"
                            d="M480 480V128a16 16 0 0 1 16 0v352h352a16 16 0 1 1 0 16H544v352a16 16 0 1 1-16 0V544H128a16 16 0 0 1 0-16h352z"
                          ></path>
                        </svg>
                      </el-icon>
                    </el-button>
                  </el-button-group>
                </template>
              </el-input>
            </el-col>
            <el-col :span="9">
              <el-input v-model.number="falange.holesPadding">
                <template #prepend>孔间距</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-input v-model.number="falange.flangeRadius">
                <template #prepend>法兰半径</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model.number="falange.flangeThickness">
                <template #prepend>法兰厚度</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-input v-model.number="falange.holesRadius">
                <template #prepend>切孔半径</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model.number="falange.centerRadius">
                <template #prepend>切圆半径</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-input v-model.number="falange.neckButtom">
                <template #prepend>颈底半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="falange.neckTop">
                <template #prepend>颈顶半径</template>
              </el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model.number="falange.neckHeight">
                <template #prepend>颈高</template>
              </el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <span>模型面数精度</span>
              <el-slider
                v-model.number="falange.segments"
                :min="3"
                :max="128"
                show-input
              ></el-slider>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-button type="primary" @click="paramUpdate" size="large">
                生成模型
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="success" size="large"> 发布订单 </el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="info" @click="shareUrl" size="large">
                分享模型
              </el-button>
            </el-col>
            <el-col
              :span="3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-button
                type="info"
                @click="cameraSet(90, 0, 0)"
                size="small"
                disabled
              >
                正视图
              </el-button>
            </el-col>
            <el-col
              :span="3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-button
                type="info"
                @click="cameraSet(0, 90, 0)"
                size="small"
                disabled
              >
                左视图
              </el-button>
            </el-col>
            <el-col
              :span="3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-button
                type="info"
                @click="cameraSet(0, 0, 90)"
                size="small"
                disabled
              >
                顶视图
              </el-button>
            </el-col>
            <el-col
              :span="3"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <el-button
                type="info"
                @click="cameraSet(45, 45, 45)"
                size="small"
                disabled
              >
                正交图
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <threeComponent ref="threeComponent" />
  </div>
</template>

<script>
// @ is an alias to /src
import threeComponent from "@/components/threeComponent.vue";
import useClipboard from "vue-clipboard3";

export default {
  name: "HomeView",
  components: {
    threeComponent,
  },
  data: function () {
    return {
      param: "param",
      falange: {
        holes: 4,
        holesPadding: 2.25,
        flangeRadius: 3,
        flangeThickness: 0.5,
        holesRadius: 0.25,
        centerRadius: 0.5,
        neckButtom: 1.5,
        neckTop: 1,
        neckHeight: 1,
        segments: 16,
      },
    };
  },
  methods: {
    holesMinus: function () {
      if (this.falange.holes > 0) {
        this.falange.holes--;
      }
    },
    holesPlus: function () {
      this.falange.holes++;
    },
    paramUpdate: function () {
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.modifyCylinder(this.falange.flangeRadius, this.falange.flangeRadius, this.falange.flangeThickness, this.falange.segments);
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.createMergedNeck(this.falange.neckButtom, this.falange.neckTop, this.falange.neckHeight, 0, (this.falange.flangeThickness + this.falange.neckHeight) / 2, 0, this.falange.segments);
      // eslint-disable-next-line prettier/prettier
      this.$refs.threeComponent.createCutHole(this.falange.centerRadius, this.falange.neckHeight + this.falange.neckHeight + this.falange.flangeThickness, 0, 0, 0, this.falange.segments);
      // eslint-disable-next-line no-empty
      for (var i = 0; i < this.falange.holes; i++) {
        var angle = (360 / this.falange.holes) * i;
        // eslint-disable-next-line prettier/prettier
        this.$refs.threeComponent.createCutHole(this.falange.holesRadius, this.falange.flangeThickness, Math.sin((angle * Math.PI) / 180) * this.falange.holesPadding, 0, Math.cos((angle * Math.PI) / 180) * this.falange.holesPadding, this.falange.segments);
      }
    },
    shareUrl: function () {
      const { toClipboard } = useClipboard();
      const copy = async () => {
        var param = "";
        for (let key in this.falange) {
          param = param + key + "=" + this.falange[key] + "&";
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
  },
  mounted: function () {
    // console.log(this.$route.query);
    if (JSON.stringify(this.$route.query) != "{}") {
      this.falange.holes = Number(this.$route.query.holes);
      this.falange.holesPadding = Number(this.$route.query.holesPadding);
      this.falange.flangeRadius = Number(this.$route.query.flangeRadius);
      this.falange.flangeThickness = Number(this.$route.query.flangeThickness);
      this.falange.holesRadius = Number(this.$route.query.holesRadius);
      this.falange.centerRadius = Number(this.$route.query.centerRadius);
      this.falange.neckButtom = Number(this.$route.query.neckButtom);
      this.falange.neckTop = Number(this.$route.query.neckTop);
      this.falange.neckHeight = Number(this.$route.query.neckHeight);
      this.falange.segments = Number(this.$route.query.segments);
    }
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
  width: 50%;
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
</style>
