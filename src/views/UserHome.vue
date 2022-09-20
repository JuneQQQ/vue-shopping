<template>
  <!--  <div class="container">-->
  <el-container class="main-container">
    <el-aside class="side-bar"
              ref="side"
    >
      <el-menu theme="light" width="auto"
               :default-active="userStore.userHomeActiveTitleId"
               class="el-menu-vertical-demo"
               @select="handleSelect"
      >
        <div class="user-icon">
          <div class="user-img">
            <el-image src="/images/350x350.png"/>
          </div>
          <p>Gavin</p>
        </div>

        <el-menu-item index="UserAddressInfo">
          <el-icon>
            <Location/>
          </el-icon>
          <span>我的收货地址</span>
        </el-menu-item>


        <el-menu-item index="UserOrderInfo">
          <el-icon>
            <Tickets/>
          </el-icon>
          <span>我的购物订单</span>
        </el-menu-item>

      </el-menu>
    </el-aside>

    <el-container class="inner-container">
      <el-header>
        <el-alert :closable="false" effect="dark"
                  style="height: 50px;width:100%;font-weight: bolder;color: black;background-color: white">
          <template #title>
            <span style="font-size: 16px;" v-text="userStore.getActiveTitle"></span>
          </template>
        </el-alert>
      </el-header>
      <el-main class="main">
        <!--        <transition mode="out-in">-->
        <RouterView></RouterView>
        <!--        </transition>-->
      </el-main>
      <el-footer class="layout-footer-center">2022 &copy; JuneQQQ</el-footer>
    </el-container>
  </el-container>
  <!--  </div>-->
</template>
<script setup lang="ts">
import router from "@/router/MainRouter";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore()

// id名对应路由组件名
const handleSelect = (id: string, path: string[]) => {
  // @ts-ignore
  userStore.userHomeActiveTitleId = id
  router.push({name: id})
}

router.push({name:'UserAddressInfo'})

</script>
<style lang="less">

.el-alert {
  .el-alert__content {
    display: block;
    width: 100%;
  }
}

</style>
<style lang="less" scoped>


aside {
  ul {
    border-color: white !important;
  }
}

.side-bar {

  height: 100%;
  width: 200px;
  background: #fff;
  overflow: auto;

}

.main-container {
  height: 100%;
}

.inner-container {
  margin: 15px;
  padding: 15px;
  height: 650px;
  background-color: #f5f7f9;
}

.side-bar a {
  color: #232323;
}

.user-icon {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-icon span {
  font-size: 96px;
}

.user-img {
  margin-bottom: 15px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
}

.user-img img {
  width: 100%;
}

.main {
  overflow-x: hidden;
}

.layout-footer-center {
  margin-bottom: -70px;
  text-align: center;
  height: 30px;
}
</style>
