<template>
  <CommonHeader v-show="$route.meta.headerShow"></CommonHeader>
  <RouterView></RouterView>
  <!--footer组件仅在Home、Search显示-->
  <CommonFooter v-show="$route.meta.footerShow"></CommonFooter>
</template>

<script setup lang="ts">
import CommonHeader from './components/header/CommonHeader.vue'
import CommonFooter from './components/footer/CommonFooter.vue'
import {useIndexStore} from "@/stores/IndexStore";

let homeStore = useIndexStore()
homeStore.getCategoryList()   // 获取首页三级分类数据，仅获取一次
homeStore.getBannerList()
homeStore.getFloorList()
// 以下为 test

////////

</script>

<style scoped>

</style>
