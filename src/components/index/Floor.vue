<template>
  <el-row style="margin: 50px 3% 3%;">
    <!--文字标题-->
    <el-col :span=24 style="padding-left: 2%;">
      <h1 style="font-size: 25px;color:black">{{ floor.title }}</h1>
    </el-col>
    <el-divider/>

    <!--card部分-->
    <el-col
        v-for="(o, index) in floor.goods"
        :key="o"
        :span='index===0?7:3'
        :offset="1"
        class="floor-col"
    >
      <!--第一张为大图-->
      <!--其他为小图-->
      <el-card :body-style="index!==0?{padding: '5px'}:{padding: '0px'}"
               :class="index===0?'card-main':'card-other'"
               shadow="hover"
      >
        <img
            :src="o.imgUrl"
            :class="index===0?'image-main':'image-other'"
        />
        <div style="padding: 14px;text-align: center" v-if="index!==0">
          <span>{{ o.describe }}</span>
          <div class="bottom">
            <el-button text class="button" style="justify-content: center">{{ o.price }}</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import {onMounted} from "vue";

defineProps<{
  floor:any
}>()

</script>
<style lang="less" scoped>
.card-main {
  cursor: pointer;
  margin-left: -15%;
  margin-right: 8px;
  margin-top: -22px;

  .image-main {
    width: 100%;
    height: 200px;
    display: block;
  }

}

.card-other {
  cursor: pointer;
  margin-top: -13%;
  margin-left: -35%;
  margin-right: 10px;
  height: 200px;

  .image-other {
    padding-left: 25%;
    padding-top: 10%;
    padding-right: 25%;
    width: 50%;
    height: 100px;
    display: block;
  }
}

.floor-col {
  margin-top: 2%;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-bottom: 20px;
  padding: 8px;
  //border: 1px solid var(--el-border-color);
}
</style>
