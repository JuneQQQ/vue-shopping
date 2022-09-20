<template>
  <el-row class="inner-container">
    <el-col :span="12" :offset="2" >
      <el-image class="signup-img-box" :fit="'fill'" src="/images/750x500.png" alt=""/>
    </el-col>
    <el-col :span="8" :offset="1" class="box">
      <div class="sign-up-title">
        <h1>欢迎注册账号</h1>
        <br>
        <h2>BIT MALL, 天天低价品质保证, 让消费者钱更值钱</h2>
      </div>
      <el-card class="sing-up-step-box">
        <!--因为步骤是从0开始，所以+1-->
        <el-steps :active="userStore.curRegisterStep+1" align-center>
          <el-step title="验证手机号" :icon="Iphone"/>
          <el-step title="填写账号信息" :icon="Edit"/>
          <el-step title="注册成功" :icon="Check"/>
        </el-steps>
        <div class="sign-up-box">
          <RegisterStep1 v-show="userStore.curRegisterStep+1===1"/>
          <RegisterStep2 v-show="userStore.curRegisterStep+1===2"/>
          <RegisterStep3 v-show="userStore.curRegisterStep+1===3"/>
        </div>
      </el-card>
    </el-col>
  </el-row>
<!--  <el-footer></el-footer>-->
</template>
<script setup lang="ts">
import {Check, Edit, Iphone} from '@element-plus/icons-vue'
import RegisterStep1 from "@/components/user/RegisterStep1.vue";
import RegisterStep2 from "@/components/user/RegisterStep2.vue";
import RegisterStep3 from "@/components/user/RegisterStep3.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

// 初始化步骤
userStore.curRegisterStep = 0

</script>

<style scoped lang="less">
.inner-container {
  margin: 15px auto;
  height: 600px;
  overflow: hidden;
}

.signup-img-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-img-box > img {
  height: 80%;
}

.sign-up-title {
  width: 430px;
  margin: 15px auto;
  height: 80px;
}

.sing-up-step-box {
  //margin: 15px auto;
  //padding-left: 30px;
  //padding-top: 30px;

  width: 90%;
  //height: 80%;
  height: 470px;
  //margin-bottom: 100px;
  //border: 1px solid #495060;
}

.sign-up-box {
  //margin: 10% 15%;
  //height: 350px;
  //width: 500px;
  //display: flex;
  //align-items: center;
}
</style>
