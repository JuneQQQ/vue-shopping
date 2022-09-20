<template>
  <el-result
      icon="success"
      title="注册成功"
      sub-title="请返回登录"
      style="margin-top: 10%"
  >
    <template #extra>
      <el-button type="danger" icon="Sunrise" @click="goLogin">去登录</el-button>
    </template>
  </el-result>
</template>
<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import router from "@/router/MainRouter";

const userStore = useUserStore()
const goLogin = () => {
  userStore.loginForm = {
    username: userStore.registerUserInfo.username,
    password: userStore.registerUserInfo.password,
  }
  userStore.registerUserInfo = {}
  userStore.loginByPassword = true

  router.push({name:'Login'})

}
</script>
<style lang="less">
.el-result {
  .el-result__title {
    p {
      font-size: 30px;
    }
  }

  .el-result__subtitle {
    p {
      font-size: 20px;
    }

  }
}

</style>
<style lang="less" scoped>
.inner-container {
  width: 100%;
  text-align: center;
}

.inner-container p {
  font-size: 90px;
  color: #2d8cf0;
  text-align: center;
}

.btn-success {
  margin-top: 30px;
}
</style>
